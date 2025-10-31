import { blocksRegistry } from '@/lib/blocks-registry';
import { NextResponse } from 'next/server';

export async function GET() {
  // Return only the metadata needed for screenshot generation
  const blocks = blocksRegistry.map(block => ({
    id: block.id,
    category: block.category,
    name: block.name,
  }));

  return NextResponse.json(blocks);
}
