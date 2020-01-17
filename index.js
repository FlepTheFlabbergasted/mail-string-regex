// The regex used
const SELECT_ALL_MAIL_REGEX = /(<.*?>)/g;
const SELECT_ALL_EXT_MAIL_REGEX = /(<ext.*?>)/g;
const MAIL_ADDRESS_DENOMINATOR = '; ';

window.onload = function() {
    console.log('Hello there');

    // Debug for inital textarea value (it is 1 for some reason)
    // let textArea = document.getElementById('pasted-mail-list');
    // let resultTextArea = document.getElementById('result');
    // let tex = textArea.value.split(';').length;
    // let res = resultTextArea.value.split(';').length;
    // document.getElementById('nr-pasted-mail-addresses').innerHTML = tex;
    // document.getElementById('nr-output-mail-addresses').innerHTML = res;

    document.getElementById('pasted-mail-list').oninput = function getNrOfPastedMailAddresses(event) {
        let textArea = document.getElementById('pasted-mail-list');

        // TODO: You're doing this two times...
        let allMail = textArea.value.match(SELECT_ALL_MAIL_REGEX).join(' ');
        let allMailWithoutExt = allMail.replace(SELECT_ALL_EXT_MAIL_REGEX, '');
        let allMailWithoutExtNoDoubleSpace = allMailWithoutExt.replace(/ +(?= )/g,'');
        let noExtNoDoubleSpaceSemicolon = allMailWithoutExtNoDoubleSpace.replace(/>/g,'>;');
        let nrOfMailAddresses = noExtNoDoubleSpaceSemicolon.split(MAIL_ADDRESS_DENOMINATOR).length;

        // TODO: You're doing this two times...
        let allExtMail = textArea.value.match(SELECT_ALL_EXT_MAIL_REGEX).join(MAIL_ADDRESS_DENOMINATOR);
        let nrOfExtMailAddresses = allExtMail.split(MAIL_ADDRESS_DENOMINATOR).length;

        document.getElementById('nr-pasted-mail-addresses').innerHTML = nrOfMailAddresses.length + nrOfExtMailAddresses.length;
        console.log("Total number of pasted mailaddresses: " + (nrOfMailAddresses.length + nrOfExtMailAddresses.length));
    }

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
        let textArea = document.getElementById('pasted-mail-list');
        let resultTextArea = document.getElementById('result');
        let nrOutputMailAdressesTextObj = document.getElementById('nr-output-mail-addresses');

        // Output string
        let resultString;

        // Check the checkboxes telling us if we should remove all ext mailaddresses or remove all non-ext addresses
        // Default is to remove all ext
        if (document.getElementById("checkbox-keep-ext").checked) {
            let matchedText = textArea.value.match(SELECT_ALL_EXT_MAIL_REGEX);
            if(matchedText === null || matchedText === undefined) {
                return;
            }

            let allExtMail = matchedText.join(MAIL_ADDRESS_DENOMINATOR);

            let nrOfExtMailAddresses = allExtMail.split(MAIL_ADDRESS_DENOMINATOR).length;
            nrOutputMailAdressesTextObj.innerHTML = nrOfExtMailAddresses;
            console.log("Number of ext mailaddresses: " + nrOfExtMailAddresses);

            resultString = allExtMail;
        } else {
            let matchedText = textArea.value.match(SELECT_ALL_MAIL_REGEX);
            if(matchedText === null || matchedText === undefined) {
                return;
            }

            let allMail = matchedText.join(' ');
            let allMailWithoutExt = allMail.replace(SELECT_ALL_EXT_MAIL_REGEX, '');
            let allMailWithoutExtNoDoubleSpace = allMailWithoutExt.replace(/ +(?= )/g,'');
            let noExtNoDoubleSpaceSemicolon = allMailWithoutExtNoDoubleSpace.replace(/>/g,'>;');

            let nrOfMailAddresses = noExtNoDoubleSpaceSemicolon.split(MAIL_ADDRESS_DENOMINATOR).length;
            nrOutputMailAdressesTextObj.innerHTML = nrOfMailAddresses;
            console.log("Number of mailaddresses: " + nrOfMailAddresses);

            resultString = noExtNoDoubleSpaceSemicolon;
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

