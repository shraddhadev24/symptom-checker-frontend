import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const styles = {
	headerFont: {
		fontSize: "30px !important",
		margin: "20px 10px !important",
	},
};

const useStyles = makeStyles(styles);

const Header = () => {
	const classes = useStyles();

	return (
		<AppBar position='static'>
			<Toolbar>
				<h5 className={classes.headerFont}>Symptom Checker</h5>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
