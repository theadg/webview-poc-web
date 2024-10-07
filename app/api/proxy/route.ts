import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
        return NextResponse.json({ error: 'Missing file ID' }, { status: 400 })
    }

    const googleDriveUrl = `https://drive.google.com/uc?id=${id}`

    try {
        const response = await fetch(googleDriveUrl)
        const data = await response.body

        // Return the file from Google Drive to the client
        return new Response(data, {
            headers: {
                'Content-Type':
                    response.headers.get('content-type') ||
                    'application/octet-stream',
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
            status: response.status,
        })
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch file' },
            { status: 500 }
        )
    }
}
