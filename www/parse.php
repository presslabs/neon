<?php
function highlight_html($string, $decode = TRUE) { 
    $find = array(
        '~(\s[a-z].*?=)~',
        '~(&lt;\!--.*?--&gt;)~s',
        '~(&quot;[a-zA-Z0-9\/].*?&quot;)~',
        '~(&lt;[a-z].*?&gt;)~',
        '~(&lt;/[a-z].*?&gt;)~',
        '~(&amp;.*?;)~',
    );
    $replace = array( 
        '<span class="hljs-attribute">$1</span>', 
        '<span class="hljs-command">$1</span>', 
        '<span class="hljs-value">$1</span>', 
        '<span class="hljs-tag">$1</span>', 
        '<span class="hljs-tag">$1</span>', 
        '<span style="font-style:italic;">$1</span>', 
    ); 
    if($decode) 
        $string = htmlentities($string); 
    return '<pre><code class="html hljs">' .  ltrim(rtrim(preg_replace($find, $replace, $string))) . '</code></pre>';
} 

return print highlight_html($_GET['data'])
?>