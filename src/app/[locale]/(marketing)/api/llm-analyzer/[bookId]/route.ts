import { logger } from '@/libs/Logger';
import { getAIInput } from '@/utils/ai-analysis/aiAnalysisTemplate';
import { isAIAnalyzerOption } from '@/utils/ai-analysis/aiAnalyzerOption';
import { getAIAnalysis } from '@/utils/ai-analysis/groq';
import { getBookText } from '@/utils/gutenberg/getBookText';
import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server'

export const GET = async ( request: NextRequest,
  { params }: { params: Promise<{ bookId: string }> }) => {

    logger.info(request.nextUrl.href);
  const searchParams = request.nextUrl.searchParams;
  const analysisType = searchParams.get('analysisType');
  logger.info(isAIAnalyzerOption(analysisType));
  if(!isAIAnalyzerOption(analysisType)) {
    return NextResponse.json({ error: 'Invalid analysis type' }, { status: 400 });
  }
  const { bookId } = await params;

  const text = await getBookText(bookId);

  if(text === undefined) {
    return NextResponse.json({ error: 'Book not found' }, { status: 404 });
  }

  // TODO: explore stream text to AI analysis
  const aiInput = getAIInput(analysisType);

  const aiOutput = await getAIAnalysis(aiInput, text);

  return NextResponse.json({
    aiOutput,
  });
};
