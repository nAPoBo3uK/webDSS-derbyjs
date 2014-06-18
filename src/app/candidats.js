/**
 * Created by bolehivsky on 18.06.14.
 */
var Candidats = function(){

}

Candidats.prototype.addRow = function(){
    console.log('newRow');
    var table = this.model.at('table');
    var matrix = table.get();
    var emptyRow = [];
    for (var i = 0; i < matrix[0].length; i++)
        emptyRow.push('');
    console.log(emptyRow);
    table.push(emptyRow);
}

Candidats.prototype.addCol = function(){
    console.log('add col');
    var table = this.model.at('table');
    var matrix = table.get();
    if(matrix && matrix.length){
        for(var i=0; i< matrix.length; i++)
            table.at(i).push('');
    }
    console.log(this.model.get());
}

Candidats.prototype.delRow = function(row){
    console.log('del row ' + row);
    var table = this.model.at('table');
    console.log(table.get());
    table.set(table.get().filter(function(item, index){return index!=row}));

}

Candidats.prototype.delCol = function(col){
    console.log('del col ' + col);
    var table = this.model.at('table');
    var matrix = table.get();

    table.set(matrix.map(function(item){
        return item.filter(function(item, index){
            return index != col;
        })
    }));

}

Candidats.prototype.init = function(){
    console.log('candidats component init');
    this.model.at('table')
    var table = this.model.at('table');
    var matrix = table.get();
    if(!matrix || !matrix.length) {
        table.push(['']);
    }
}

Candidats.prototype.editCell = function(cell, row, col){

    this.model.set('edit', {
        row: row,
        col: col,
        text: cell
    });

    window.getSelection().removeAllRanges();
    document.getElementById('cell'+ row + col).focus()
}

Candidats.prototype.doneEditing = function(){
    console.log('done edit');
    var cell = this.model.get('edit');
    this.model.set('table.' + cell.row + '.' + cell.col, cell.text);
    this.model.del('edit');
}

Candidats.prototype.cancelEditing = function(e){
    // 27 = ESQ-key
    if (e.keyCode == 27) {
        this.model.del('edit');
    }
}

module.exports = Candidats;