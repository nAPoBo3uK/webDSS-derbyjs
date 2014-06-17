/**
 * Created by bolehivsky on 18.06.14.
 */
var Candidats = function(){

}

Candidats.prototype.addCandidat = function(){
    console.log('newRow');
    var candidats = this.model.at('_page.newVoting.candidats');
    var arr = candidats.get();
    if(arr && arr.length){
        var emptyLine = []
        for(var i=0; i< arr[0].length; i++)
            emptyLine.push(['']);
        candidats.push(emptyLine);
    } else {
        candidats.push(['']);
    }
}

Candidats.prototype.addCriteria = function(){
    console.log('add criteria');
    var table = this.model.at('table');
    var matrix = table.get();
    if(matrix && matrix.length){
        for(var i=0; i< matrix.length; i++)
            this.model.at('table.'+i).push('');
    }
}

Candidats.prototype.init = function(){
    console.log('candidats component init');
    this.model.at('table').push(['']);
    console.log(this.model.get());
}

module.exports = Candidats;