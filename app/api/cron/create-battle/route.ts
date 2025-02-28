import { NextResponse } from 'next/server'
import { createNewRapBattle, shouldCreateNewBattle } from '@/lib/rapBattle'

export async function GET(req: Request) {
    // Verify the request is from your cron service
    const authHeader = req.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new NextResponse('Unauthorized', { status: 401 })
    }

    try {
        // Check if we should create a new battle
        const shouldCreate = await shouldCreateNewBattle()
        if (!shouldCreate) {
            return NextResponse.json({ 
                message: 'No new battle needed at this time' 
            })
        }

        // Create new battle
        const result = await createNewRapBattle()
        
        if (!result.success) {
            throw result.error
        }

        return NextResponse.json({ 
            message: 'New battle created successfully',
            battle: result.battle
        })

    } catch (error) {
        console.error('Error in create-battle cron:', error)
        return NextResponse.json({ 
            error: 'Failed to create new battle' 
        }, { status: 500 })
    }
}
