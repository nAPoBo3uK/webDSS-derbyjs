/**
 * Created by bolehivsky on 09.07.14.
 */
module.exports = function (usersPreferences, cb){

    Object.defineProperties(usersPreferences, {
        sumCols: {
            value: function() {
                if(this[0] instanceof Array) {
                    var result = new FilledArray(this[0].length);
                    for(var j=0; j<this[0].length;j++)
                        for(var i=0;i<this.length;i++)
                            result[j] += this[i][j];
                    return result;
                } else return this;
            },
            writeble:false
        },
        getPairwiseComparisons: {
            value: function(){
                if(this[0] instanceof Array) {
                    var candidatsCount = this[0].length;
                    var result = new PairwiseComparison( candidatsCount );
                    result.votesCount = this.length;
                    for(var i=0;i<this.length;i++)
                        for(var j=0; j<candidatsCount;j++)
                            for(var k=j; k<candidatsCount;k++)
                                if(this[i][j] > this[i][k]){
                                    result[j][k]++;
                                } else if (this[i][j] < this[i][k]){
                                    result[k][j]++;
                                }
                    return result;
                } else return this;
            },
            writable: false
        }
    });
    /* constructors */
    function FilledArray(length, value, blocked){
        if(length)
            if ( value ) {
                for( var i=0; i<length; i++ ) {
                    if(i == blocked) {
                        this.push(undefined);
                    } else  this.push(value);
                }
            } else {
                for( var i=0; i<length; i++ ) {
                    if(i == blocked) {
                        this.push(undefined);
                    } else  this.push(0);
                }
            }
    }

    FilledArray.prototype = Object.defineProperties([], {

        range: {
            value: function( desc ){
                var result = new FilledArray(this.length);
                if(desc){
                    for(var i=0; i<this.length; i++)
                        for(var j=0; j<this.length; j++)
                            if( this[i] > this[j] )
                                result[j]++;
                } else {
                    for(var i=0; i<this.length; i++)
                        for(var j=0; j<this.length; j++)
                            if( this[i] < this[j] )
                                result[j]++;
                }

                return result;
            }
        },
        max: {
            value: function(){
                var max = this[0] ? this[0] : this [2];
                for( var i=1; i<this.length; i++ )
                    if( max < this[i] )
                        max = this[i];
                return max;
            }
        },
        min: {
            value: function(){
                var min= this[0] ? this[0] : this [2];
                for( var i=1; i<this.length; i++ )
                    if( min > this[i] )
                        min = this[i];
                return min;
            }
        }
    });

    function PairwiseComparison( candidatsCount ){
        for ( var i=0; i<candidatsCount; i++ )
            this.push(new FilledArray(candidatsCount,0,i));


    }
    PairwiseComparison.prototype = Object.defineProperties([], {
        votesCount:{
            writable: true
        },
        min: {
            value: function(by){
                console.log('PairwiseComparison.min');
                var result = new FilledArray();
                switch(by){
                    case 'c': // by cols
                        break;
                    case 'r': // by rows
                        for( var i=0; i<this.length; i++ )
                            result.push(this[i].min());
                        break;
                    default: // all matrix
                }
                return result;
            }

        },
        max: {
            value: function(by){
                console.log('PairwiseComparison.max');
                var result = new FilledArray();
                switch(by){
                    case 'c': // by cols
                        break;
                    case 'r': // by rows
                        for( var i=0; i<this.length; i++ )
                            result.push(this[i].max());
                        break;
                    default: // all matrix
                }
                return result;
            }

        }
    })
    /*+++++++++++++++++++++++++++++++++++++++++*/
// borda
    function borda ( usersPreferences ) {
        var fB = usersPreferences.sumCols();
        return fB;
    };

// modified Borda
    function mBorda ( comparisons ) {
        // var comparisons = usersPreferences.getPairwiseComparisons();
        var fmB = new FilledArray( comparisons.length );
        for(var i=0; i<comparisons.length; i++)
            for(var j=0; j<comparisons.length; j++)
                if(i!=j)                        // there are undefined values
                    fmB[i] += comparisons[i][j] - comparisons[j][i];
        return fmB;
    }


    /*Jodson*/
    function jodson(comparisons){
        fJ = new FilledArray( comparisons.length );
        var voutesHalf = comparisons.votesCount / 2;
        for(var i=0; i<comparisons.length; i++)
            for(var j=0; j<comparisons.length; j++)
                if(i!=j) {                       // there are undefined values
                    if(comparisons[i][j] < comparisons[j][i])
                        fJ[i] = voutesHalf - comparisons[i][j];
                }
        return fJ;

    }
//Simpson
    /**
     rules 'min' or 'max' may give different results
     */
    function simpson ( comparisons, rule ){
        //var comparisons = usersPreferences.getPairwiseComparisons();
        if(!rule || rule == 'min') {
            return comparisons.min('r');
        } else if(rule == 'max') {
            return comparisons.max('r');
        }

    }

    function fisbern( comparisons ) {
        var fF = new FilledArray( comparisons.length );
        for(var i=0; i<comparisons.length; i++)
            for(var j=0; j<comparisons.length; j++)
                if(i!=j)                        // there are undefined values
                    if(comparisons[i][j]< comparisons[j][i])
                        fF[i]++;
        return fF;
    }

    var comaprisons = usersPreferences.getPairwiseComparisons();
console.log(comaprisons);
    var result = {
      //  'Borda': borda ( usersPreferences ).range('desc'),
        'mBorda':mBorda ( comaprisons ).range('desc'),
        'Jodson':jodson ( comaprisons ).range(),
        'Simpson':simpson ( comaprisons ).range('desc'),
        'Fishbern': fisbern ( comaprisons ).range('desc')
    }
    cb(result);/*
    console.log('Borda ' + borda ( usersPreferences ).range().toString());
    console.log('modified Borda ' + mBorda ( comaprisons ).range().toString());
    console.log('Jodson ' + jodson ( comaprisons ).range('desc').toString());
    console.log('Simpson maxmin ' + simpson ( comaprisons ).range().toString());
    console.log('Simpson minmax ' + simpson ( comaprisons ,'max' ).range('desc').toString());
    console.log('Fisbern ' + fisbern ( comaprisons ).toString());
*/
}