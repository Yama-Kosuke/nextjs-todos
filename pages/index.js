import React, { useState } from "react";
import Link from 'next/link'
import Head from "next/head";
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
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
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
import DeleteIcon from '@material-ui/icons/Delete';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';

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
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 140,
  },
  table: {
    minWidth: 700,
  },
  "& > *": {
    margin: theme.spacing(1),
    width: "30ch",
  },
}));

export default function Home() {
  const [todos, setTodos] = useState([]);
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
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
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
  };

  return (
    <>
      <Head>
        <title>Todo App</title>
      </Head>

      <div className={classes.root}>
        <CssBaseline />
        {/* 上部のバー構成 */}
        <AppBar
          position="static"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
          style={{ color: "#e0f2f1", backgroundColor: "#000" }}
        >
          <Toolbar>
            {/* ハンバーガーアイコン */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            {/*  */}
            {/* タイトル */}
            <Typography variant="h6" noWrap>
              Todo App
            </Typography>
            {/*  */}
          </Toolbar>
        </AppBar>

        {/* ドロワーメニュー */}
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          {/*  */}

          {/* ハンバーガーメニュー：項目 */}
          <List>
            {["Todo一覧", "削除済みTodo"].map((text, index) => (
              <Link href="/delete/delete">
                <ListItem button key={text}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <FormatListNumberedIcon /> : <DeleteIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              </Link>
            ))}
          </List>
        </Drawer>
      </div>
      <Container maxWidth="md">
        <div className="App">
          <h1>TODO登録</h1>
        </div>
        <div>
          <form className={classes.container}>
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
                      onClick={() => onClickDelete(index)}
                    >
                      削除
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
