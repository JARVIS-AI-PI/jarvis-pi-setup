// modules/code/code.js

module.exports = async function handleCode(query) {
  const prompt = query.toLowerCase();

  if (prompt.includes("python")) {
    return `
Sure! Here's a Python example:

\`\`\`python
def reverse_string(s):
    return s[::-1]

# Example
print(reverse_string("hello"))
\`\`\`
    `;
  }

  if (prompt.includes("javascript")) {
    return `
Here's a JavaScript example:

\`\`\`javascript
function reverseString(str) {
  return str.split('').reverse().join('');
}

console.log(reverseString("hello"));
\`\`\`
    `;
  }

  // You can add more languages and templates here
  return `Sorry, I can’t generate code for that language yet.`;
};
