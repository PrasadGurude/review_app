import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextRequest, NextResponse } from 'next/server';

// Enable Edge Runtime
export const runtime = 'edge';

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
});

export async function POST(req) {
    try {
        // Validate API key
        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json(
                { error: 'OpenAI API key not configured' },
                { status: 500 }
            );
        }

        // Extract and validate messages from request body
        const prompt = "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What's a hobby you've recently started?||If you could have dinner with any historical figure, who would it be?||What's a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment."
        // Request completion from OpenAI
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            max_tokens: 200,
            stream: true,
            prompt,
        });

        // Create and return stream
        const stream = OpenAIStream(response);
        return new StreamingTextResponse(stream);

    } catch (error) {
        console.error('Error processing request:', error);

        if (error instanceof OpenAI.APIError) {
            const { name, status, headers, message } = error;
            return NextResponse.json(
                {
                    error: 'OpenAI API Error',
                    name,
                    status,
                    headers,
                    message
                },
                { status: status || 500 }
            );
        }

        return NextResponse.json(
            {
                error: 'Internal Server Error',
                message: 'An unexpected error occurred'
            },
            { status: 500 }
        );
    }
}