/**
 * Created by bolehivsky on 18.06.14.
 */
var Candidats = function(){

}

Candidats.prototype.addCandidat = function(){
    console.log('newRow');
    var table = this.model.at('table');
    var matrix = table.get();
    if(matrix && matrix.length) {
        var emptyRow = [];
        for (var i = 0; i < matrix[0].length; i++)
            emptyRow.push('');
        console.log(emptyRow);
        table.push(emptyRow);
    } else {
        table.push(['']);

    }


}

Candidats.prototype.addCriteria = function(){
    console.log('add criteria');
    var table = this.model.at('table');
    var matrix = table.get();
    if(matrix && matrix.length){
        for(var i=0; i< matrix.length; i++)
            table.at(i).push('');
    }
}

Candidats.prototype.delCandidat = function(row){
    console.log('del candidat ' + row);
    var table = this.model.at('table');
    console.log(table.get());
    table.set(table.get().filter(function(item, index){index!=row}));

}
Candidats.prototype.delCrireria = function(col){
    console.log('del candidat ' + row);
    var table = this.model.at('table');
    var matrix = table.get();
    for(var i= 0; i<matrix.length;i++)
        table.del(i + '.' + col);

}

Candidats.prototype.init = function(){
    console.log('candidats component init');
      console.log(this.model.get());
}

module.exports = Candidats;