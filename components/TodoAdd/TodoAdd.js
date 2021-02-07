import React, { useState , useEffect} from "react";
import { makeStyles, useTheme, } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },

  table: {
    minWidth: 700,
  },
  "& > *": {
    margin: theme.spacing(1),
    width: "30ch",
  },
}));

export default function TodoAdd( {todos, setTodos}) {
  useEffect(()=> {
  console.log(todos,setTodos)
  setTodos([{todoText: "text"}])
  },[])
  console.log(todos)
  const theme = useTheme();
  const classes = useStyles();
  const [tmpTodo, setTmpTodo] = useState("");
  const addTodo = () => {
    if (tmpTodo === "") {
      alert("文字を入力してください");
      return;
    }
    setTodos([...todos, tmpTodo]);
    setTmpTodo("");
  };
  const deleteTodo = (index) => {
    const newTodos = todos.filter((todo, todoIndex) => {});
    setTodos(newTodos);
  };

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const AddTodaysDate = `${year}年${month}月${day}日`;

  const dateToStr24HPad0 = (date, format) => {
    if (!format) {
      format = "YYYY-MM-DD";
    }
    format = format.replace(/YYYY/g, date.getFullYear());
    format = format.replace(/MM/g, ("0" + (date.getMonth() + 1)).slice(-2));
    format = format.replace(/DD/g, ("0" + date.getDate()).slice(-2));
    return format;
  };
  const nowDate = dateToStr24HPad0(new Date(), "YYYY-MM-DD");

  const [todoText, setTodoText] = useState("");
  const onChangeTodoText = (e) => setTodoText(e.target.value);
  const [listTodos, setListTodos] = useState([]);
  const onClickAdd = () => {
    if (todoText === "") return;
    const newListTodos = [...listTodos, { todoText, nowDate, achiveDate }];
    setListTodos(newListTodos);
    setTodoText("");
  };

  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  function sampleDate(date, format) {
    format = format.replace(/YYYY/, date.getFullYear());
    format = format.replace(/MM/, date.getMonth() + 1);
    format = format.replace(/DD/, date.getDate());

    return format;
  }

  const achiveDate = sampleDate(selectedDate, "YYYY年MM月DD日");
  const [add, setAdd] = useState([]);
  const onClickDelete = (index) => {
    const newListTodos = [...listTodos];
    newListTodos.splice(index, 1);
    setListTodos(newListTodos);
  };

  return (
    <>
      <Container maxWidth="md">
        <div className="App">
          <h1>TODO登録</h1>
        </div>
        <div>
          <form className={classes.container} onSubmit={onClickAdd}>
            <input
              style={{ width: "400px" }}
              placeholder="TODOを入力"
              value={todoText}
              onChange={onChangeTodoText}
            />

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="yyyy/MM/dd"
                  margin="normal"
                  id="date-picker-inline"
                  label="達成期日"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>

            <Button variant="contained" onClick={onClickAdd}>
              追　加
            </Button>
          </form>
          <p style={{ fontSize: "20px" }}></p>
        </div>
      </Container>
    </>
  );
}
