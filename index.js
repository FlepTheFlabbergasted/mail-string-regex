window.onload = function() {
    console.log('Hello there');

    document.getElementById('submit').onclick = function regexStuff(event) {

        /* Test:
            sdf sdf (EXT) <ext1.sdf@sdf.com>;
            sdfsdf trt <NOTEXT1@sdf.com>;
            pojk pojok (EXT) <ext2.sdf@sf.com>;
            uhiuh iuhhi <NOTEXT2.ewr@sdf.com>;
            pojk pojok (EXT) <ext3.sdf@sf.com>;
            pojk pojok (EXT) <ext4.sdf@sf.com>;
            uhiuh iuhhi <NOTEXT3.ewr@sdf.com>;
        */

        // Once the page is loaded get the elements
        let textArea = document.getElementById('mail-list');
        let resultTextArea = document.getElementById('result');
        // console.log("textarea: " + textArea.value);

        // The regex used and the resulting string
        let selectAllMailRegex = /(<.*?>;)/g;
        let selectAllExtMailRegex = /(<ext.*?>;)/g;
        let resultString;

        // Check the checkboxes telling us if we should remove all ext mailaddresses or remove all non-ext addresses
        // Default is to remove all ext
        if (document.getElementById("checkbox-keep-ext").checked) {
            let allExtMail = textArea.value.match(selectAllExtMailRegex).join(' ');
            // console.log("allExtMail: " + allExtMail);
            resultString = allExtMail;
        } else {
            let allMail = textArea.value.match(selectAllMailRegex).join(' ');
            let allMailWithoutExt = allMail.replace(selectAllExtMailRegex, '');
            let allMailWithoutExtNoDoubleSpace = allMailWithoutExt.replace(/ +(?= )/g,'');
            // console.log("allMailWithoutExt: " + allMailWithoutExt);
            resultString = allMailWithoutExtNoDoubleSpace;
        }

        resultTextArea.value = resultString;
    }

    // https://stackoverflow.com/questions/9709209/html-select-only-one-checkbox-in-a-group
    // the selector will match all input controls of type :checkbox
    // and attach a click event handler 
    $("input:checkbox").on('click', function() {
      // in the handler, 'this' refers to the box clicked on
      var $box = $(this);
      if ($box.is(":checked")) {
        // the name of the box is retrieved using the .attr() method
        // as it is assumed and expected to be immutable
        var group = "input:checkbox";//[name='" + $box.attr("name") + "']";
        // the checked state of the group/box on the other hand will change
        // and the current value is retrieved using .prop() method
        $(group).prop("checked", false);
        $box.prop("checked", true);
      } else {
        $box.prop("checked", false);
      }
    });
}

