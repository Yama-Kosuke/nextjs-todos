import React, { createContext, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Modal from "react-modal";
import clsx from "clsx";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Container from "@material-ui/core/Container";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DeleteIcon from "@material-ui/icons/Delete";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import TodoList from "./TodoList/todoList";
import TodoDelete from "./TodoDelete/TodoDelete";
import HeaderLine from "../components/HeaderLine/HeaderLine";
import TodoAdd from "../components/TodoAdd/TodoAdd";

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

// モーダルスタイル
const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "400px",
    height: "150px",
    transform: "translate(-50%, -50%)",
  },
};

export const TodoContext = createContext();
export const DeleteTodoContext = createContext();

export default function Home() {
  const [todos, setTodos] = useState([]);
  const theme = useTheme();
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [modalIsOpen, setIsOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState();

  // モーダルのstateをtrueに変更（モーダルを開く）＆削除ボタンのid番号をstateに格納処理
  const openModal = (index) => {
    setIsOpen(true);
    setDeleteIndex(index);
  };

  // モーダルのstateをfalseに変更（モーダルを閉じる）
  const closeModal = () => {
    setIsOpen(false);
  };

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

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
    closeModal();
    console.log(index);
  };

  return (
    <>
      <HeaderLine />
      <TodoAdd todos={todos} setTodos={setTodos} />
      <Container maxWidth="md">
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">id</StyledTableCell>
                <StyledTableCell align="center">TODO</StyledTableCell>
                <StyledTableCell align="center">作成日</StyledTableCell>
                <StyledTableCell align="center">達成期限</StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {listTodos.map((todo, index) => (
                <StyledTableRow
                  key={todo}
                  id={index}
                  value={add}
                  onChange={(e) => setAdd(e.target.value)}
                >
                  <StyledTableCell align="center">{index + 1}</StyledTableCell>
                  <StyledTableCell align="center">
                    {todo.todoText}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {AddTodaysDate}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {todo.achiveDate}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => openModal(index)}
                    >
                      削除
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={customStyles}
            >
              <h3 align="center">本当に削除しますか？</h3>
              <div align="center">
                <Button onClick={closeModal}>キャンセル</Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => onClickDelete(deleteIndex)}
                >
                  OK
                </Button>
              </div>
            </Modal>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
