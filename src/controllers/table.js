//function to validate if the inputs are correct or not
export const validateInputs = ( min, max ) =>
{
    if ( min === "" )
    {
        alert( "Min value is mandatory" );
        return false;
    } else if ( min === "2" )
    {
        alert( "Invalid min value" );
        return false;
    } else if ( max === "" )
    {
        alert( "Max value is mandatory" );
        return false;
    } else if ( parseInt( min ) >= parseInt( max ) )
    {
        alert( "Min should be lower than max" );
        return false;
    }
    return true;
};


//function to create a new id for the new row
export const create_UUID = () =>
{
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace( /[xy]/g, function ( c )
    {
        var r = ( dt + Math.random() * 16 ) % 16 | 0;
        dt = Math.floor( dt / 16 );
        return ( c === 'x' ? r : ( r & 0x3 | 0x8 ) ).toString( 16 );
    } );
    return uuid;
};


//function to maintain the continuity in the table
export const maintainData = ( tableData, index ) =>
{
    //check if the data has been added / edited at the 0 index
    if ( index === 0 )
    {
        if ( tableData[ 0 ].min > 1 )
        {
            var newRow = {
                id: create_UUID(),
                name: "1 - " + ( tableData[ 0 ].min - 1 ) + " units",
                min: 1,
                max: ( tableData[ 0 ].min - 1 )
            };
            tableData.unshift( newRow );
        }
    }
    
    var backwardPointer = index;
    var forwardPointer = index;

    /*loop to maintain the rows backward from the index. 
     4 conditions:
     1. if the max of row just 1 before the pointer is -1 of the min of pointer. Do nothing.
     2. if the max of row just 1 before the pointer is -2 of the min of pointer, in this case increase the max of the previous.
        since we cannot have the min and max same.
     3. if the max of row just 1 before the pointer <-2  of the min of pointer, in this case there is difference between the 2 rows and we need to add a row.
     4. the min of current overlap the previous row.
    
    */
    for ( var i = index - 1; i >= 0; i-- )
    {
        if ( tableData[ i ].max === ( tableData[ backwardPointer ].min - 1 ) )
        {
            backwardPointer--;
        } else if ( tableData[ i ].max === ( tableData[ backwardPointer ].min - 2 ) )
        {
            tableData[ i ].max = tableData[ i ].max + 1;
            backwardPointer--;
        } else if ( tableData[ i ].max < ( tableData[ backwardPointer ].min - 2 ) )
        {
            var newRow1 = {
                id: create_UUID(),
                min: tableData[ i ].max + 1,
                max: tableData[ backwardPointer ].min - 1
            };
            tableData.splice( i + 1, 0, newRow1 );
            backwardPointer--;
        } else if ( tableData[ i ].max >= tableData[ backwardPointer ].min )
        {
            if ( tableData[ i ].min >= ( tableData[ backwardPointer ].min - 2 ) )
            {
                tableData.splice( i, 1 );
                forwardPointer--;
                backwardPointer--;
            } else
            {
                tableData[ i ].max = tableData[ backwardPointer ].min - 1;
                backwardPointer--;
            }
        }
    }

    /*loop to maintain the rows forward from the index. 
     4 conditions:
     1. if the min of row just 1 after the pointer is +1 of the max of pointer. Do nothing.
     2. if the min of row just 1 after the pointer is +2 of the max of pointer, in this case decrease the min of the after.
        since we cannot have the min and max same.
     3. if the min of row just 1 after the pointer >+2  of the max of pointer, in this case there is difference between the 2 rows and we need to add a row.
     4. the max of current overlap the next row.
    
    */
    
    for ( var j = forwardPointer + 1; j < tableData.length; j++ )
    {
        if ( tableData[ j ].min === ( tableData[ forwardPointer ].max + 1 ) )
        {
            forwardPointer++;
        } else if ( tableData[ j ].min === ( tableData[ forwardPointer ].max + 2 ) )
        {
            tableData[ j ].min = tableData[ j ].min - 1;
            forwardPointer++;
        } else if ( tableData[ j ].min > ( tableData[ forwardPointer ].max + 2 ) )
        {
            var newRow2 = {
                id: create_UUID(),
                min: tableData[ forwardPointer ].max + 1,
                max: tableData[ j ].min - 1
            };
            tableData.splice( j, 0, newRow2 );
            forwardPointer++;
        } else if ( tableData[ j ].min <= tableData[ forwardPointer ].max )
        {
            if ( tableData[ j ].max <= ( tableData[ forwardPointer ].max + 2 ) )
            {
                tableData.splice( j, 1 );
                j--;
            } else
            {
                tableData[ j ].min = tableData[ forwardPointer ].max + 1;
                forwardPointer++;
            }
        }
    }

    //loop to add name to the rows
    for ( var k = 0; k < tableData.length - 1; k++ )
    {
        tableData[ k ].name = tableData[ k ].min + " - " + tableData[ k ].max + " Units";
    }
    tableData[ tableData.length - 1 ].name = tableData[ tableData.length - 1 ].min + "+ Units";
    return true;
};