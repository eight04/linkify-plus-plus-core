/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["recursive off"] = 
`<a href="http://example.com" title="Linkify Plus Plus" class="linkifyplus" target="_blank" rel="noopener">example.com</a> <span>example.com</span>`;
/* end snapshot recursive off */

snapshots["basic"] = 
`<a href="http://example.com" title="Linkify Plus Plus" class="linkifyplus" target="_blank" rel="noopener">example.com</a> <span><a href="http://example.com" title="Linkify Plus Plus" class="linkifyplus" target="_blank" rel="noopener">example.com</a></span>`;
/* end snapshot basic */

snapshots["wbr"] = 
`<a href="http://example.com" title="Linkify Plus Plus" class="linkifyplus" target="_blank" rel="noopener">exam<wbr>ple.com</a>`;
/* end snapshot wbr */

snapshots["invalid tags"] = 
`<script>example.com</script>`;
/* end snapshot invalid tags */

