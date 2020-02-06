var clickbtn = null;
dict={"Alliteration":"Repetition of sounds (vowels or consonants) at the beginning of words","Assonance":"Repetition of a vowel sound within two or more words in close proximity","Consonance":"Repetition of a consonant sound within two or more words in close proximity.","Symbolism":"A device in literature where an object represents an idea","Diction":"Word choice","Tone":"Attitude a writer takes toward the audience, a subject, or a character","Tone Shift":"When a writer moves from one tone to another in one piece of writing","Imagery":"Description that appeals to any of the five senses (sight, sound, smell, touch, taste). Does not have to be all of the senses.","Allusion":"A reference to a specific, famous person, place, event, literary work, or work of art","Free Verse":"Poetry that does not have a regular structure or rhyme scheme","Prose":"Any writing that is not poetry (regular paragraph form)","Enjambment":"The continuation of a sentence without a pause beyond the end of a line, couplet, or stanza","Stanza":"A group of lines in a poem (kind of like a paragraph in a poem)","Rhyme scheme":"The ordered pattern of rhymes at the ends of the lines of a poem","Internal rhyme":"A word inside a line rhymes with another word on the same line","Slant rhyme":"A rhyming sound that is not exact","Figurative language":"Non-literal language","Metaphor":"A comparison without using \"like\" or \"as\"","Simile":"A comparison using \"like\" or \"as\"","Hyperbole":"Exaggeration","Onomatopoeia":"A word that imitates the sound it represents","Personification":"Giving human characteristics to something non-human or inanimate"}

function getAns() {
var prmpt=document.getElementsByClassName("StudentPrompt-inner")[0].innerText
var answr=dict[prmpt]
var aTags=document.getElementsByTagName("div")
for (var i = 0; i < aTags.length; i++) {
  if (aTags[i].innerHTML == answr) {
    clickbtn = aTags[i];
    break;
  }
}
if(clickbtn != null) {
	clickbtn.click();
	clickbtn=null;	
}
}
setInterval(getAns, 200)
