// Combined mock data object for PdfTranslator simulation
export const MOCK_DATA = {
  translatedHtml: {
    1: `<h1>Page 1 Title</h1>
        <p>This is the translated content for page 1. It contains several paragraphs to simulate a realistic document.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna eu tincidunt consectetur, nisi nisl aliquam eros, a facilisis enim sapien nec quam.</p>
        <h2>Section 1.1</h2>
        <p>Aliquam erat volutpat. Etiam euismod, justo eu facilisis cursus, sapien erat cursus enim, nec dictum urna erat euismod enim.</p>
        <ul>
          <li>First bullet point for page 1</li>
          <li>Second bullet point for page 1</li>
          <li>Third bullet point for page 1</li>
        </ul>
        <p>End of page 1 content.</p>`,
    2: `<h1>Page 2 Title</h1>
        <p>This is the translated content for page 2. It also contains multiple paragraphs and a table.</p>
        <p>Phasellus euismod, sapien eu cursus cursus, enim erat cursus enim, nec dictum urna erat euismod enim.</p>
        <h2>Section 2.1</h2>
        <p>Morbi facilisis, enim eu cursus cursus, enim erat cursus enim, nec dictum urna erat euismod enim.</p>
        <table border="1" style="width:100%">
          <thead>
            <tr><th>Header 1</th><th>Header 2</th></tr>
          </thead>
          <tbody>
            <tr><td>Row 1 Col 1</td><td>Row 1 Col 2</td></tr>
            <tr><td>Row 2 Col 1</td><td>Row 2 Col 2</td></tr>
          </tbody>
        </table>
        <p>End of page 2 content.</p>`,
    3: `<h1>Page 3 Title</h1>
        <p>This is the translated content for page 3. It includes a list and a code block.</p>
        <h2>Section 3.1</h2>
        <ol>
          <li>First ordered item</li>
          <li>Second ordered item</li>
          <li>Third ordered item</li>
        </ol>
        <pre><code>function helloWorld() {
  console.log('Hello, world!');
}</code></pre>
        <p>End of page 3 content.</p>`,
  },
  totalPages: 3,
  currentPageToProcess: 1,
  status: "completed",
};
