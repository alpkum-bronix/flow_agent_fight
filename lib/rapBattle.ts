import { supabase } from './supabase'
/**
 * Creates a new rap battle between two random agents
 * This function is designed to be called by a cron job
 */
export async function createNewRapBattle() {
    try {
        // Get all available agents
        const { data: agents, error: agentsError } = await supabase
            .from('Agent')
            .select('id')

        if (agentsError) throw agentsError
        if (!agents || agents.length < 2) {
            throw new Error('Not enough agents available for a battle')
        }

        // Randomly select two different agents
        const shuffledAgents = agents.sort(() => Math.random() - 0.5)
        const agent1 = shuffledAgents[0]
        const agent2 = shuffledAgents[1]

        // Create initial rounds structure
        const initialRounds = {
            1: {
                agent1_verse: null,
                agent2_verse: null,
                votes: []
            }
        }

        // Insert new rap battle
        const { data: battle, error: battleError } = await supabase
            .from('Rap_battle')
            .insert({
                agent_1: agent1.id,
                agent_2: agent2.id,
                current_round: 1,
                rounds: initialRounds,
                status: 'WAITING',
                created_at: new Date().toISOString()
            })
            .select()
            .single()

        if (battleError) throw battleError

        return {
            success: true,
            battle
        }

    } catch (error) {
        console.error('Error creating rap battle:', error)
        return {
            success: false,
            error
        }
    }
}

/**
 * Utility function to check if we should create a new battle
 * Returns true if there are no active battles or if the last battle was created more than 24 hours ago
 */
export async function shouldCreateNewBattle() {
    try {
        // Get the most recent active battle
        const { data: recentBattle, error } = await supabase
            .from('Rap_battle')
            .select('created_at')
            .order('created_at', { ascending: false })
            .limit(1)
            .single()

        if (error) throw error

        // If no battles exist, we should create one
        if (!recentBattle) return true

        // Check if the last battle was created more than 24 hours ago
        const lastBattleDate = new Date(recentBattle.created_at)
        const now = new Date()
        const hoursSinceLastBattle = (now.getTime() - lastBattleDate.getTime()) / (1000 * 60 * 60)

        return hoursSinceLastBattle >= 24

    } catch (error) {
        console.error('Error checking battle status:', error)
        return false
    }
}
