import React, { Fragment, Component } from 'react';
import './App.scss';


import { validateInputs, create_UUID, maintainData } from "./controllers/table";
import ModalBox from "./components/Modal/Modal.component";
import Header from "./components/Header/Header.component";
import Table from "./components/Table/Table.component";




class App extends Component
{
  constructor ()
  {
    super();

    this.state = {
      tableData: []
    };
  }

  componentDidMount ()
  {
    this.setState( {
      modelIsOpen: false,
      modelEditIsOpen: false
    } );
  }

  //function to change the state of the add modal 
  setModalIsOpenClose = () =>
  {
    var currentState = this.state.modelIsOpen;
    this.setState( { modelIsOpen: !currentState } );
  }

  //function to change the state of the edit modal to true or false
  setEditModalIsOpenClose = (e) =>
  {
    var id = e.target.parentElement.parentElement.getAttribute( "id" );
    if ( !id )
    {
      id = e.target.parentElement.parentElement.parentElement.getAttribute("id");
    }
    if ( id )
    {
      var object = this.state.tableData.filter( ( value ) =>
      {
        return value.id === id;
      } )[ 0 ];
      this.setState( { editRow: object });
    }
    var currentState = this.state.modelEditIsOpen;
    this.setState( { modelEditIsOpen: !currentState } );
  }

  //function when a new row has been added.
  onAddNewRow = () =>
  {
    var min = document.getElementById( "idModalAddMin" ).value;
    var max = document.getElementById( "idModalAddMax" ).value;
    //validating the inputs
    var returnFromValidate = validateInputs( min, max );
    if(returnFromValidate){
      min = parseInt( min );
      max = parseInt( max );
      var id = create_UUID();
      var added = this.addData( min, max, id );
      if ( added )
      {
        var currentState = this.state.modelIsOpen;
        this.setState( { modelIsOpen: !currentState } );
      }
    }
    
  }
  
  // when a new data is added from the modal
  addData = ( min, max, id ) =>
  {
    const { tableData } = this.state;
    //if the table is empty
    if ( tableData.length === 0 )
    {
      if ( min !== 1 )
      {
        var newRow = {
          id: create_UUID(),
          name: "1 - " + (min - 1) + " units",
          min: 1,
          max: min - 1
        };
        tableData.push( newRow );
      }
      var newData = {
        id, min, max,
        name: min + " - " + max + " units"
      }
      tableData.push( newData );      
      var lastRow = {
          id: create_UUID(),
          min: max+1,
          name: max+1 + "+  units"
      };
      tableData.push( lastRow );
      
      this.setState( { tableData: tableData } );
      return true;
    } else
    //if not then add the data at the correct place to maintain the sort
    {
      var index = 0;
      for ( var i = 0; i < tableData.length; i++ )
      {
        if ( tableData[ i ].min >= min )
        {
          var object = { id, min, max };
          tableData.splice( i, 0, object );
          index = i;
          break;
        }
      }
      //calling the function to maintain the continuity
      var maintained = maintainData( tableData, index);
      if ( maintained )
      {
        this.setState( { tableData: tableData } );
        return true;
      }
    }
  }
  //function called when the submit is clicked on the edit modal
  onEditRow = () =>
  { 
    var min = document.getElementById( "idModalEditMin" ).value;
    var max = document.getElementById( "idModalEditMax" ).value;

    var returnFromValidate = validateInputs( min, max );
    //replace the values of the edited values
    if ( returnFromValidate )
    {
      var { editRow, tableData } = this.state;
      var index = 0;
      for ( var i = 0; i < tableData.length; i++ )
      {        
        if ( tableData[ i ].id === editRow.id )
        {
          editRow.min = parseInt(min);
          editRow.max = parseInt(max);
          tableData[ i ] = { ...editRow };
          index = i;
          break;
        }
      }
      //sorting the data as per the min in each element
      tableData.sort( ( a, b ) => { return a.min - b.min; } );

      for ( var j = 0; j < tableData.length; j++ )
      {
        if ( tableData[ j ].id === editRow.id )
        {
          index = j;
          break;
        }
      }
      //calling the function to maintain the continuity
      var maintained = maintainData( tableData, index );
      if ( maintained )
      {
        var currentState = this.state.modelEditIsOpen;
        this.setState( {
          modelEditIsOpen: !currentState,
          tableData: tableData
        } );
      }
      
    }
    

  }

  

  render () {
    const { modelIsOpen, modelEditIsOpen, tableData} = this.state;
    
    return (
      <div>
        
        <Fragment>
          
          <ModalBox
              isOpen={ modelIsOpen }
              h1Text={ "Add Row" }
              minLabel={ "Add Min:" }
              maxLabel={"Add Max:"}
              minInputId={ "idModalAddMin" }
              maxInputId={"idModalAddMax" }              
              rowData={ tableData }
              Submit={ this.onAddNewRow }
              Close={ this.setModalIsOpenClose }>
          </ModalBox>
          <ModalBox
            isOpen={ modelEditIsOpen }
            h1Text={ "Edit Row" }
            minLabel={"Edit Min:"}
            maxLabel={ "Edit Max:" }
            minInputId={ "idModalEditMin" }
            maxInputId={"idModalEditMax" }
            rowData={ tableData }
            Submit={ this.onEditRow }
            Close={ this.setEditModalIsOpenClose }>
          </ModalBox>
          
          <Header title="Assigment" />
          <button className="buttonClass" type="button" onClick={this.setModalIsOpenClose}>Add</button>
          <Table 
            tableData={tableData}
            headingColumns={['Name', 'Min', 'Max', 'Action']}
            title="Assignment Table"
            tdClick = {this.setEditModalIsOpenClose}
          />      
        </Fragment>
      </div>
      
    );
  }
  
}

export default App;
