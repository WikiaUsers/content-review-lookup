// When Ctrl/Cmd + 0 is pressed when the page editor is focused...
// ... align the "=" in the selected text or entire editor if no text is selected.
$('#wpTextbox1').keydown(function(ev)
{
    // Check if the user pressed Ctrl/Cmd and 0 (48 is the code for the 0 key)
    if ((ev.ctrlKey || ev.metaKey) && ev.keyCode == 48 && ! ev.altKey)
    {
        // Get the selected text or all text
        var selected_text = (window.getSelection().toString()) ? window.getSelection().toString() : this.value;
        var cleaned_text  = '';
        var pos           = 0;
        var max_pos       = 0;
        var diff          = 0;
        var j             = 0;
        var space         = '';

        // Reduce the spacing between each parameter and the "=" to a single space.
        // Put each line in an array
        var lines         = selected_text.replace(/(\n\|\s*[^\=]*[^ ])\s*\=/g, '$1 \=').split('\n');

        // Loop through each line to find the furthest out "=".
        for (var i = 0; i < lines.length; i++)
        {
            pos = (lines[i].indexOf('|') == 0) ? lines[i].indexOf('=') : -1;
            if (pos > max_pos) max_pos = pos;
        }

        // Loop through each line again
        for (i = 0; i < lines.length; i++)
        {
            // Get the number of spaces to add
            pos     = (lines[i].indexOf('|') == 0) ? lines[i].indexOf('=') : -1;
            diff    = max_pos - pos;
            space   = '';
            // Add the spaces
            for (j = 0; j < diff; j++) space += ' ';
            // Append the reformatted line into a new string for the reformatted text
            cleaned_text += (lines[i].indexOf('|') == 0) ? lines[i].replace('=', space+'=') : lines[i];
            if (i != lines.length - 1) cleaned_text += '\n'; // add a line break, unless this is the last line
        }

        // Get the text inside each set of gallery tags
        var galleries = cleaned_text.match(/<gallery[^>]*>(\n(.*))*?<\/gallery>/g);
        var gallery_lines;
        var cleaned_gallery_text;
        galleries = galleries ? galleries : [];

        for (i = 0; i < galleries.length; i++)
        {
            // Reset some values lingering from previous iterations
            cleaned_gallery_text = '';
            pos = max_pos = 0;

            // Reduce the spacing before the "|" in each line to a single space.
            // Put each line in an array.
            gallery_lines = galleries[i].replace(/(\n[^\|]*[^ ])\s*\|/g, '$1 \|').split('\n');

            // Loop through each line to find the furthest out "|"
            for (j = 0; j < gallery_lines.length; j++)
            {
                pos = gallery_lines[j].indexOf('|');
                if (pos > max_pos) max_pos = pos;
            }

            // Loop through each line again
            for (j = 0; j < gallery_lines.length; j++)
            {
                // Get the amount of space to add
                pos     = gallery_lines[j].indexOf('|');
                diff    = max_pos - pos;
                space   = '';
                for (k = 0; k < diff; k++) space += ' ';

                // Append the reformatted line into a new string for the reformatted text
                cleaned_gallery_text += gallery_lines[j].indexOf('|') ? gallery_lines[j].replace('|', space+'|') : gallery_lines[j];
                if (j != gallery_lines.length - 1) cleaned_gallery_text += '\n'; // add a line break, unless this is the last line
            }

            cleaned_text = cleaned_text.replace(galleries[i], cleaned_gallery_text);
        }

        // Replace the old text with the new text
        this.value = this.value.replace(selected_text, cleaned_text);
    }
});