import { NextRequest, NextResponse } from 'next/server';
import {
  messageApplicationService,
  llmApplicationService,
} from '@/src/infrastructure/dependencies';

export async function GET() {
  try {
    const messages = await messageApplicationService.getMessageHistory();
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, userId } = body;

    if (!content || !userId) {
      return NextResponse.json(
        { error: 'Content and userId are required' },
        { status: 400 }
      );
    }

    const message = await messageApplicationService.sendMessage(content, userId);
    return NextResponse.json(message);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to send message' },
      { status: 500 }
    );
  }
}

