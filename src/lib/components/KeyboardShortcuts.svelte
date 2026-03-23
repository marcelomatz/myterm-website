<!-- Keyboard shortcuts reference in ASCII-box style -->
<div class="shortcuts-wrap" role="region" aria-label="keyboard shortcuts">
  <h3 class="section-title">Keyboard Shortcuts</h3>
  <div class="table-wrap">
    <table class="kb-table">
      <thead>
        <tr>
          <th>Action</th>
          <th>Shortcut</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>New Tab</td><td><kbd>Ctrl</kbd>+<kbd>T</kbd></td></tr>
        <tr><td>Close Tab</td><td><kbd>Ctrl</kbd>+<kbd>W</kbd></td></tr>
        <tr><td>Next Tab</td><td><kbd>Ctrl</kbd>+<kbd>Tab</kbd></td></tr>
        <tr><td>Prev Tab</td><td><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>Tab</kbd></td></tr>
        <tr><td>Split Horizontal</td><td><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>E</kbd></td></tr>
        <tr><td>Split Vertical</td><td><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>O</kbd></td></tr>
        <tr><td>Close Pane</td><td><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>W</kbd></td></tr>
        <tr><td>Copy</td><td><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>C</kbd></td></tr>
        <tr><td>Paste</td><td><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>V</kbd></td></tr>
        <tr><td>Font +</td><td><kbd>Ctrl</kbd>+<kbd>=</kbd></td></tr>
        <tr><td>Font −</td><td><kbd>Ctrl</kbd>+<kbd>-</kbd></td></tr>
        <tr><td>Font Reset</td><td><kbd>Ctrl</kbd>+<kbd>0</kbd></td></tr>
        <tr><td>Settings</td><td><kbd>Ctrl</kbd>+<kbd>,</kbd></td></tr>
        <tr><td>Find</td><td><kbd>Ctrl</kbd>+<kbd>F</kbd></td></tr>
      </tbody>
    </table>
  </div>
</div>

<style>
  .shortcuts-wrap {
    max-width: 560px;
    margin: 0 auto;
  }
  .section-title {
    font-size: 11px;
    letter-spacing: 0.15em;
    color: var(--br-black);
    text-transform: uppercase;
    margin-bottom: 16px;
    text-align: center;
  }
  .table-wrap {
    border: 1px solid var(--dim);
    border-radius: 8px;
    overflow: hidden;
  }
  .kb-table {
    width: 100%;
    border-collapse: collapse;
    font-family: inherit;
    font-size: 13px;
  }
  .kb-table thead tr {
    background: var(--dim);
    color: var(--br-black);
  }
  .kb-table th {
    padding: 10px 18px;
    text-align: left;
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-weight: 500;
  }
  .kb-table td {
    padding: 9px 18px;
    color: var(--fg);
    border-top: 1px solid var(--dim);
  }
  .kb-table tr:hover td {
    background: color-mix(in srgb, var(--dim) 30%, transparent);
    color: var(--accent);
    transition: background 0.15s, color 0.15s;
  }
  .kb-table td:last-child {
    text-align: right;
  }
  kbd {
    display: inline-block;
    padding: 2px 7px;
    border: 1px solid var(--br-black);
    border-radius: 4px;
    font-family: inherit;
    font-size: 11px;
    color: var(--cyan);
    background: var(--dim);
    margin: 0 2px;
  }
</style>
