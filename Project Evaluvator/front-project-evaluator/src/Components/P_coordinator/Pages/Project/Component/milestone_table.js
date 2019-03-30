
import React,{Component} from 'react'

class Products extends React.Component {

    constructor(props) {
      super(props);
  
      //  this.state.products = [];
      this.state = {};
      this.state.filterText = "";
      this.state.products = [
        {
          Projectname: 1,
          Grp_or_I: 'Group',
          Markspresentatge: 12,
          Milestone: 'football',
          MilstoneType:'',
          Duration:''
        }
      ];
  
    }
    handleUserInput(filterText) {
      this.setState({filterText: filterText});
    };
    handleRowDel(product) {
      var index = this.state.products.indexOf(product);
      this.state.products.splice(index, 1);
      this.setState(this.state.products);
    };
  
    handleAddEvent(evt) {
      var Projectname = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
      var product = {
        Projectname: Projectname,
        Milestone: "",
        Grp_or_I: "",
        Markspresentatge: 0,
        Duration:"",
        MilstoneType:""
      }
      this.state.products.push(product);
      this.setState(this.state.products);
  
    }
  
    handleProductTable(evt) {
      var item = {
        Projectname: evt.target.Projectname,
        Milestone: evt.target.Milestone,
        MilstoneType: evt.target.MilstoneType,
        Duration:evt.target.Duration,
        Markspresentatge:evt.target.Markspresentatge,
        Grp_or_I:evt.target.Grp_or_I,
        value: evt.target.value
      };
  var products = this.state.products.slice();
    var newProducts = products.map(function(product) {
  
      for (var key in product) {
        if (key == item.Milestone && product.Projectname == item.Projectname) {
          product[key] = item.value;
  
        }
      }
      return product;
    });
      this.setState({products:newProducts});
    //  console.log(this.state.products);
    };
    render() {
  
      return (
        <div>
          <SearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput.bind(this)}/>
          <ProductTable onProductTableUpdate={this.handleProductTable.bind(this)} onRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} products={this.state.products} filterText={this.state.filterText}/>
        </div>
      );
  
    }
  
  }
  class SearchBar extends React.Component {
    handleChange() {
      this.props.onUserInput(this.refs.filterTextInput.value);
    }
    render() {
      return (
        <div>
  
          <input type="text" placeholder="Search..." value={this.props.filterText} ref="filterTextInput" onChange={this.handleChange.bind(this)}/>
  
        </div>
  
      );
    }
  
  }
  
  class ProductTable extends React.Component {
   
  
    render() {
      
      var onProductTableUpdate = this.props.onProductTableUpdate;
      var rowDel = this.props.onRowDel;
      var filterText = this.props.filterText;
      var product = this.props.products.map(function(product) {
        if (product.Milestone.indexOf(filterText) === -1) {
          return;
        }
        return (<ProductRow onProductTableUpdate={onProductTableUpdate} product={product} onDelEvent={rowDel.bind(this)} key={product.Projectname}/>)
      });
      return (
        <div>
          <div class="form-group pt-3">
            <label for="projectSelect">Select Project</label>
            <div className="row">
              <div className="col-md-4">
              <select class="form-control" Projectname="projectSelect">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
              </div>
              </div>
            </div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Milestone</th>
                <th>Milestone Type</th>
                <th>marks Presentage</th>
                <th>Group or Individual</th>
                <th>Time duration(Weeks)</th>
              </tr>
            </thead>
  
            <tbody>
              {product}
  
            </tbody>
  
          </table>
          <button type="button" onClick={this.props.onRowAdd} className="btn btn-success pull-right">Add</button>
          


        </div>
      );
  
    }
  
  }
  
  class ProductRow extends React.Component {
    onDelEvent() {
      this.props.onDelEvent(this.props.product);
      console.log(this.props.product)
    }
    render() {
  
      return (
        <tr className="eachRow">
          <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
            "type": "Milestone",
            value: this.props.product.Milestone,
            Projectname: this.props.product.Projectname
          }}/>
          <td>
            <select value={this.props.MilstoneType} onProductTableUpdate={this.props.onProductTableUpdate}>
              <option>Prestation</option>
              <option>Documentation </option>
              <option>Viva </option>
            </select>
          </td>
          <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
            type: "Markspresentatge",
            value: this.props.product.Markspresentatge,
            Projectname: this.props.product.Projectname
          }}/>
          <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
            type: "Grp_or_I",
            value: this.props.product.Grp_or_I,
            Projectname: this.props.product.Projectname
          }}/>
          {/* <td className="pd-3">
            <select>
              <option>1 week</option>
              <option>2 weeks</option>
              <option>3 weeks</option>
              <option>4 weeks</option>
              <option>5 weeks</option>
              <option>6 weeks</option>
              <option>7 weeks</option>
              <option>8 weeks</option>
            </select>
          </td> */}
           <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
            type: "Duration",
            value: this.props.product.Duration,
            Projectname: this.props.product.Projectname
            
          }}
          />
          <td className="del-cell">
            <input type="button" onClick={this.onDelEvent.bind(this)} value="X" className="del-btn"/>
          </td>
        </tr>
        
               
      );
  
    }
  
  }
  class EditableCell extends React.Component {
  
    render() {
      return (
        
        <td>
          <input type='text' name={this.props.cellData.type} id={this.props.cellData.Projectname} value={this.props.cellData.value} onChange={this.props.onProductTableUpdate}/>
        </td>
      
      );
  
    }
  
  }
export default Products;  
