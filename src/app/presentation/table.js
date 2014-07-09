/**
 * Created by bolehivsky on 18.06.14.
 */
var TableEditable = function (){ };

TableEditable.prototype.addRow = function(){
    console.log('newRow');
    var table = this.model.at('table');
    var matrix = table.get();
    var emptyRow = [];
    for (var i = 0; i < matrix[0].length; i++)
        emptyRow.push('');
    console.log(emptyRow);
    table.push(emptyRow);
}

TableEditable.prototype.addCol = function(){
    console.log('add col');
    var table = this.model.at('table');
    var matrix = table.get();
    if(matrix && matrix.length){
        for(var i=0; i< matrix.length; i++)
            table.at(i).push('');
    }
    console.log(this.model.get());
}

TableEditable.prototype.delRow = function(row){
    console.log('del row ' + row);
    var table = this.model.at('table');
    console.log(table.get());
    table.set(table.get().filter(function(item, index){return index!=row}));

}

TableEditable.prototype.delCol = function(col){
    console.log('del col ' + col);
    var table = this.model.at('table');
    var matrix = table.get();

    table.set(matrix.map(function(item){
        return item.filter(function(item, index){
            return index != col;
        })
    }));

}
TableEditable.prototype.setEditMode = function(){
    if(this.model.get('editMode')){
        this.model.set('editMode',false);
    } else {
        this.model.set('editMode',true);
    }

}

TableEditable.prototype.init = function(){
    console.log('Table component init');
    this.model.at('table')
    var table = this.model.at('table');
    var matrix = table.get();
    if(!matrix || !matrix.length) {
        table.push(['']);
        this.model.set('editable', true);
    } else this.model.set('editable', false);
}

TableEditable.prototype.editCell = function(cell, row, col){
    var self = this;
    this.model.set('edit', {
        row: row,
        col: col,
        text: cell
    });

    window.getSelection().removeAllRanges();
    var input = document.getElementById('editcell'+ row +''+ col);
    input.focus();
    input.onblur = function(){
        TableEditable.prototype.doneEditing.call(self);
    }

}

TableEditable.prototype.doneEditing = function(){
    console.log('done editing');
    var cell = this.model.get('edit'); console.log(cell);
    this.model.set('table.' + cell.row + '.' + cell.col, cell.text);
    this.model.del('edit');
}

TableEditable.prototype.cancelEditing = function(e){
    // 27 = ESQ-key
    if (e.keyCode == 27) {
        this.model.del('edit');
    }
}
TableEditable.prototype.switchEditMode = function(){
    this.model.set('editable',this.model.get('editable')?false:true);
}
module.exports =  TableEditable;