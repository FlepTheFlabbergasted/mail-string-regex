window.onload = function() {
    console.log('hi');

    document.getElementById('submit').onclick = function regexStuff(event) {
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
}