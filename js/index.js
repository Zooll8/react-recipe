"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Panel = ReactBootstrap.Panel;
var PanelGroup = ReactBootstrap.PanelGroup;
var Modal = ReactBootstrap.Modal;
var Button = ReactBootstrap.Button;
if (!localStorage.hasOwnProperty("_zooll_recipes")) {
   localStorage.setItem("_zooll_recipes", JSON.stringify([{
      name: "Spaghetti",
      ingridients: ["Water", "Powder", "Italian Mother"]
   }, {
      name: "Pizza",
      ingridients: ["Powder", "Water", "Frozen pizza", "Microwave"]
   }, {
      name: "Cake",
      ingridients: ["Water", "Powder", "Eggs", "Sugar", "Sounds legit, right?"]
   }, {
      name: "Soup",
      ingridients: ["Water", "Meat", "Carrot", "Potato", "Little bit tomato", "Pepper"]
   }]));
}

function Welcome(props) {
   return React.createElement(
      "div",
      { className: "row text-center" },
      "Recipes by ",
      React.createElement(
         "a",
         { href: "https://www.github.com/zooll8", target: "_blank" },
         "Zooll"
      ),
      React.createElement("br", null),
      React.createElement("br", null)
   );
}

var RecipeMain = function (_React$Component) {
   _inherits(RecipeMain, _React$Component);

   function RecipeMain(props) {
      _classCallCheck(this, RecipeMain);

      var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

      _this.state = {
         recipes: JSON.parse(localStorage.getItem("_zooll_recipes")),
         showadd: false,
         showedit: false,
         currentedit: {
            name: "",
            ingridients: [""]
         },
         currentnum: 0
      };
      _this.openadd = _this.openadd.bind(_this);
      _this.closeadd = _this.closeadd.bind(_this);
      _this.openedit = _this.openedit.bind(_this);
      _this.closeedit = _this.closeedit.bind(_this);
      return _this;
   }
   //just refreshes array at the front

   RecipeMain.prototype.refreshlist = function refreshlist() {
      this.setState({
         recipes: JSON.parse(localStorage.getItem("_zooll_recipes"))
      });
   };
   //Cleare whole localStorage array and all recipes

   RecipeMain.prototype.clearAll = function clearAll() {
      localStorage._zooll_recipes = JSON.stringify([]);
      this.refreshlist();
   };
   //Disables clear all function

   RecipeMain.prototype.ClearDisable = function ClearDisable() {
      if (this.state.recipes.length > 0) {
         return false;
      } else {
         return true;
      }
   };
   //Close add modal

   RecipeMain.prototype.openadd = function openadd() {
      this.setState({
         showadd: true
      });
   };
   //Close add modal

   RecipeMain.prototype.closeadd = function closeadd() {
      this.setState({
         showadd: false
      });
   };
   //Open edit modal

   RecipeMain.prototype.openedit = function openedit() {
      this.setState({
         showedit: true
      });
   };
   //Close edit modal

   RecipeMain.prototype.closeedit = function closeedit() {
      this.setState({
         showedit: false
      });
   };
   //This function save new recipe at the same place where you clicked edit

   RecipeMain.prototype.save = function save() {
      var newrecipename = document.getElementById("editname").value;
      var newrecipebody = document.getElementById("editbody").value.split(" ");
      var localorecipes = this.state.recipes;
      var object = {
         name: newrecipename,
         ingridients: newrecipebody
      };
      localorecipes[this.state.currentnum] = object;
      localStorage._zooll_recipes = JSON.stringify(localorecipes);
      this.refreshlist();
      this.closeedit();
   };
   //This runs when you click delete on one recipe

   RecipeMain.prototype.deleteRecipe = function deleteRecipe(i) {
      var localorecipes = this.state.recipes;
      localorecipes.splice(i, 1);
      localStorage._zooll_recipes = JSON.stringify(localorecipes);
      this.refreshlist();
   };
   //Submit form of Add Recipe Modal

   RecipeMain.prototype.submit = function submit() {
      var newrecipename = document.getElementById("recipename").value;
      var newrecipebody = document.getElementById("recipebody").value.split(" ");
      var localorecipes = this.state.recipes;
      var object = {
         name: newrecipename,
         ingridients: newrecipebody
      };
      localorecipes.push(object);
      localStorage._zooll_recipes = JSON.stringify(localorecipes);
      this.refreshlist();
      this.closeadd();
   };
   //Runs edit recipe Modal

   RecipeMain.prototype.editRecipe = function editRecipe(i) {
      var localorecipe = this.state.recipes[i];
      this.setState({
         currentedit: localorecipe,
         currentnum: i
      });
      this.openedit();
   };

   RecipeMain.prototype.render = function render() {
      var _this2 = this;

      //This is function where it renders whole body part of container
      var persons = this.state.recipes.map(function (item, i) {
         var elementi = item.ingridients.map(function (el, x) {
            return React.createElement(
               "p",
               { key: x },
               el
            );
         });
         return React.createElement(
            Panel,
            { className: "panel-info",
               header: "" + item.name,
               eventKey: "" + i },
            " ",
            elementi,
            React.createElement("br", null),
            " ",
            React.createElement(
               "button",
               { className: "btn btn-info",
                  onClick: function onClick() {
                     return _this2.editRecipe(i);
                  } },
               " Edit "
            ),
            "  ",
            React.createElement(
               "button",
               { className: "btn btn-default", onClick: function onClick() {
                     return _this2.deleteRecipe(i);
                  } },
               "Delete"
            ),
            " "
         );
      });
      return React.createElement(
         "div",
         { id: "main" },
         React.createElement(
            "div",
            { className: "container" },
            React.createElement(Welcome, null),
            React.createElement(
               "div",
               { className: "row" },
               React.createElement("div", { className: "col-sm-3" }),
               React.createElement(
                  "div",
                  { className: "col-sm-6 well" },
                  React.createElement(
                     PanelGroup,
                     { defaultActiveKey: "", accordion: true },
                     persons
                  ),
                  React.createElement(
                     "button",
                     { className: "btn btn-danger", onClick: function onClick() {
                           return _this2.clearAll();
                        }, disabled: this.ClearDisable() },
                     "Clear all"
                  )
               ),
               React.createElement("div", { className: "col-sm-3" })
            ),
            React.createElement(
               "div",
               { className: "row text-center" },
               React.createElement(
                  "button",
                  { onClick: this.openadd, className: "btn btn-success", id: "add" },
                  "Add recipe"
               )
            )
         ),
         React.createElement(
            Modal,
            { show: this.state.showadd, onHide: this.closeadd },
            React.createElement(
               Modal.Header,
               { closeButton: true },
               React.createElement(
                  Modal.Title,
                  null,
                  "New Recipe Form"
               )
            ),
            React.createElement(
               Modal.Body,
               null,
               React.createElement(
                  "div",
                  { className: "form-group" },
                  React.createElement(
                     "label",
                     { "for": "recipename" },
                     "Write your Recipe Title:"
                  ),
                  React.createElement("textarea", { className: "form-control", rows: "1", id: "recipename", placeholder: "Write super cool name for your super cool Recipe! ^_^" })
               ),
               React.createElement(
                  "div",
                  { className: "form-group" },
                  React.createElement(
                     "label",
                     { "for": "recipebody" },
                     "Write your Recipe Ingridients separated by spaces:"
                  ),
                  React.createElement("textarea", { className: "form-control", rows: "3", id: "recipebody", placeholder: "Write all ingridients separated by spaces!" })
               )
            ),
            React.createElement(
               Modal.Footer,
               null,
               React.createElement(
                  Button,
                  { className: "btn-primary", onClick: function onClick() {
                        return _this2.submit();
                     } },
                  "Submit"
               ),
               React.createElement(
                  Button,
                  { className: "btn-default", onClick: this.closeadd },
                  "Close"
               )
            )
         ),
         React.createElement(
            Modal,
            { show: this.state.showedit, onHide: this.closeedit },
            React.createElement(
               Modal.Header,
               { closeButton: true },
               React.createElement(
                  Modal.Title,
                  null,
                  "Recipe Change Form"
               )
            ),
            React.createElement(
               Modal.Body,
               null,
               React.createElement(
                  "div",
                  { className: "form-group" },
                  React.createElement(
                     "label",
                     { "for": "editname" },
                     "Rewrite your Recipe Title here:"
                  ),
                  React.createElement("textarea", { className: "form-control", rows: "1", id: "editname", onChange: function onChange() {
                        return _this2.whatever();
                     }, value: this.state.currentedit.name })
               ),
               React.createElement(
                  "div",
                  { className: "form-group" },
                  React.createElement(
                     "label",
                     { "for": "editbody" },
                     "Change your Recipe Ingridients separated by spaces:"
                  ),
                  React.createElement("textarea", { className: "form-control", rows: "3", id: "editbody", onChange: function onChange() {
                        return _this2.whatever();
                     }, value: this.state.currentedit.ingridients.join(" ") })
               )
            ),
            React.createElement(
               Modal.Footer,
               null,
               React.createElement(
                  Button,
                  { className: "btn-primary", onClick: function onClick() {
                        return _this2.save();
                     } },
                  "Save"
               ),
               React.createElement(
                  Button,
                  { className: "btn-default", onClick: this.closeedit },
                  "Close"
               )
            )
         )
      );
   };

   return RecipeMain;
}(React.Component);

ReactDOM.render(React.createElement(RecipeMain, null), document.getElementById("root"));