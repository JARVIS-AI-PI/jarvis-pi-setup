// modules/tutor/tutor.js

module.exports = {
  name: "tutor",
  description: "Offline subject tutor: math, science, and grammar tips",

  run(args, callback) {
    const question = args.join(" ").toLowerCase();
    if (!question) return callback("❓ Ask me a question about math, science, or grammar.");

    const knowledge = [
      { keywords: ["photosynthesis"], answer: "Photosynthesis is the process by which green plants make their own food using sunlight, carbon dioxide, and water." },
      { keywords: ["gravity"], answer: "Gravity is a force that pulls objects toward the center of the Earth or any other mass." },
      { keywords: ["molecule"], answer: "A molecule is the smallest unit of a chemical compound that retains its chemical properties." },
      { keywords: ["noun"], answer: "A noun is a word that names a person, place, thing, or idea." },
      { keywords: ["verb"], answer: "A verb is a word that expresses an action or state of being." },
      { keywords: ["pi"], answer: "Pi is a mathematical constant approximately equal to 3.14159." },
      { keywords: ["area of circle"], answer: "The area of a circle is A = π × r²." },
      { keywords: ["newton"], answer: "Isaac Newton formulated the laws of motion and universal gravitation." },
      { keywords: ["evolution"], answer: "Evolution is the process through which species change over time through natural selection." },
    ];

    const found = knowledge.find(item => item.keywords.some(k => question.includes(k)));

    if (found) {
      callback("📘 " + found.answer);
    } else {
      callback("🤷 Sorry, I don't know that yet. Try asking a different topic.");
    }
  }
};
