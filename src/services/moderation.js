const badWords = [
  // Political terms
  'politics', 'election', 'vote', 'democrat', 'republican', 'liberal', 'conservative',
  // Hate speech and slurs (keeping list minimal in example)
  'hate', 'racist', 'discrimination',
  // Negative terms
  'terrible', 'awful', 'horrible', 'hate', 'worst', 'stupid', 'idiot', 'dumb'
];

// Normalize text for comparison (remove special chars, spaces, make lowercase)
function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '') // Remove special characters
    .replace(/\s+/g, '');      // Remove spaces
}

// Check if text contains any bad words, including attempts to bypass
function containsBadContent(text) {
  const normalized = normalizeText(text);
  
  return badWords.some(word => {
    const normalizedWord = normalizeText(word);
    return normalized.includes(normalizedWord);
  });
}

function validatePost(content) {
  if (!content || typeof content !== 'string') {
    return { valid: false, reason: 'Invalid content' };
  }

  if (containsBadContent(content)) {
    return { valid: false, reason: 'Post contains inappropriate content' };
  }

  // Check for excessive negativity (basic example)
  const negativePatterns = [
    /(?:^|\s)(?:not|never|no|none)(?:\s|$)/gi,
    /(?:^|\s)(?:cant|cannot|can't)(?:\s|$)/gi,
    /[!?]{2,}/g // Multiple exclamation/question marks
  ];

  const negativeCount = negativePatterns.reduce((count, pattern) => 
    count + (content.match(pattern) || []).length, 0);

  if (negativeCount > 2) {
    return { valid: false, reason: 'Post seems too negative' };
  }

  return { valid: true };
}

module.exports = {
  validatePost
};