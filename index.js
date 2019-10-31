window.onload = function() {
    console.log('hi');

    document.getElementById('submit').onclick = function regexStuff(event) {

        /*
        Stuff I didn't use:
        
        // Remove all ext mail adresses, this leaves all non-ext mails and all names
        .\(*EXT\).<ext.*?>;

        <(.*?)\>.; // Select all mail adresses including the "<>" and finishing ';'
        */

        // Select everything between the "; <"
        let selectBetweenRegex = /;.*?</g
         // Replace with this to only keep the mails including the "<>" and finishing ';'
        let replaceBetweenString = "; <"

        // Select all ext mail adresses
        let selectExtMailRegex = /<ext.*?>; /g
                                        // ^ SPACE

        let textArea = document.getElementById('mail-list');
        let resultTextArea = document.getElementById('result');
        // console.log("textarea: " + textArea.value);

        let first = textArea.value.replace(selectBetweenRegex, replaceBetweenString);
        let final = first.replace(selectExtMailRegex, "");

        resultTextArea.value = final;
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

