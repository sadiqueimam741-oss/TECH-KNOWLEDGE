'use client';

import { useMemo } from 'react';

export default function ArticleContentClient({ content }: { content: string }) {
  const renderedContent = useMemo(() => {
    // Simple markdown to HTML converter
    let html = content;

    // Headers
    html = html.replace(/^### (.*?)$/gm, '<h3 class="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">$1</h3>');
    html = html.replace(/^## (.*?)$/gm, '<h2 class="text-3xl font-bold mt-10 mb-6 text-gray-900 dark:text-white">$1</h2>');
    html = html.replace(/^# (.*?)$/gm, '<h1 class="text-4xl font-bold mt-12 mb-8 text-gray-900 dark:text-white">$1</h1>');

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>');

    // Italic
    html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');

    // Links
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="link-text">$1</a>');

    // Code blocks
    html = html.replace(/```(.*?)```/gs, '<pre class="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto my-6"><code>$1</code></pre>');

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded font-mono text-sm">$1</code>');

    // Blockquotes
    html = html.replace(/^> (.*?)$/gm, '<blockquote class="border-l-4 border-blue-600 pl-4 my-4 italic text-gray-700 dark:text-gray-300">$1</blockquote>');

    // Unordered lists
    html = html.replace(/^\- (.*?)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*?<\/li>)/s, '<ul class="list-disc list-inside space-y-2 my-4">$1</ul>');

    // Ordered lists
    html = html.replace(/^\d+\. (.*?)$/gm, '<li>$1</li>');

    // Tables (basic support)
    const tableRegex = /\|(.+)\|(.+)\|([\s\S]*?)\|/g;
    html = html.replace(tableRegex, (match) => {
      const rows = match.split('\n').filter(row => row.trim());
      if (rows.length < 2) return match;

      let table = '<table class="w-full border-collapse border border-gray-300 dark:border-gray-700 my-4"><tbody>';
      rows.forEach((row, idx) => {
        const cells = row.split('|').filter(cell => cell.trim());
        table += '<tr>';
        cells.forEach(cell => {
          const tag = idx === 0 ? 'th' : 'td';
          table += `<${tag} class="border border-gray-300 dark:border-gray-700 p-2">${cell.trim()}</${tag}>`;
        });
        table += '</tr>';
      });
      table += '</tbody></table>';
      return table;
    });

    // Paragraphs
    html = html.replace(/\n\n/g, '</p><p class="my-6 leading-8 text-gray-700 dark:text-gray-300">');
    html = `<p class="my-6 leading-8 text-gray-700 dark:text-gray-300">${html}</p>`;

    // Remove extra p tags
    html = html.replace(/<p><\/p>/g, '');
    html = html.replace(/<p>(<h[1-6])/g, '$1');
    html = html.replace(/(<\/h[1-6]>)<\/p>/g, '$1');
    html = html.replace(/<p>(<pre)/g, '$1');
    html = html.replace(/(<\/pre>)<\/p>/g, '$1');
    html = html.replace(/<p>(<ul|<blockquote)/g, '$1');
    html = html.replace(/(<\/ul>|<\/blockquote>)<\/p>/g, '$1');
    html = html.replace(/<p>(<table)/g, '$1');
    html = html.replace(/(<\/table>)<\/p>/g, '$1');

    return html;
  }, [content]);

  return (
    <div
      className="prose prose-sm dark:prose-invert max-w-none mb-12"
      dangerouslySetInnerHTML={{ __html: renderedContent }}
    />
  );
}
