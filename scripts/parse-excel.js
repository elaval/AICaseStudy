import XLSX from 'xlsx';
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read the Excel file
const workbook = XLSX.readFile(join(__dirname, '../attached_assets/Report Summary_1759337111366.xlsx'));

// Get the first sheet
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Convert to JSON
const rawData = XLSX.utils.sheet_to_json(worksheet);

// Extract category from use_case_tags
function extractCategory(useCaseTags, sector) {
  if (!useCaseTags) return sector || 'General AI';
  
  try {
    const tags = JSON.parse(useCaseTags);
    if (tags && tags.length > 0) {
      return tags[0]; // Use first tag as category
    }
  } catch (e) {
    // If parsing fails, return sector
  }
  
  return sector || 'General AI';
}

// Determine status based on relevance
function getStatus(isRelevant, relevanceScore) {
  if (!isRelevant) return 'Archived';
  if (relevanceScore >= 80) return 'Active';
  if (relevanceScore >= 60) return 'In Progress';
  return 'Planned';
}

// Create deterministic ID from content
function createDeterministicId(row, index) {
  if (row.caseId) return row.caseId;
  // Create stable ID from title and sector
  const title = (row.ai_title || row.original_title || '').toLowerCase().replace(/[^a-z0-9]/g, '-');
  const sector = (row.sector || '').toLowerCase().replace(/[^a-z0-9]/g, '-');
  return `${sector}-${title}-${index}`.substring(0, 100);
}

// Transform the data to match our schema
const aiCases = rawData
  .filter(row => row.is_relevant) // Only include relevant cases
  .map((row, index) => ({
    id: createDeterministicId(row, index),
    title: row.ai_title || row.original_title || 'Untitled Case',
    category: extractCategory(row.use_case_tags, row.sector),
    status: getStatus(row.is_relevant, row.relevance_score),
    description: row.original_description || '',
    industry: row.sector || 'Technology',
    technology: row.data_models || null,
    impact: row.solution_approach || null,
    dateImplemented: null,
    organization: null,
    keyMetrics: row.implementation_details ? 
      `Relevance Score: ${row.relevance_score}%, Confidence: ${row.confidence}%` : null,
    challenges: row.context_problem || null,
    solutions: row.solution_approach || null,
  }));

// Write to JSON file
const outputPath = join(__dirname, '../client/src/data/ai-cases.json');
writeFileSync(outputPath, JSON.stringify(aiCases, null, 2));

console.log(`✓ Successfully converted ${aiCases.length} AI cases to JSON`);
console.log(`✓ Output: client/src/data/ai-cases.json`);
