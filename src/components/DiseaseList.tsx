import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const styles = {
	accordion: {
		border: "1px solid silver",
		borderRadius: "8px !important",
		marginBottom: "15px",
		backgroundColor: "#bae1ff !important",
		color: "black !important",
	},
	heading: {
		fontSize: "20px !important",
	},
	summaryBox: {
		fontSize: 16,
		textAlign: "justify" as const,
	},
};

const useStyles = makeStyles(styles);

const DiseaseList = (props: { diseaseList: any[] }) => {
	const classes = useStyles();
	const { diseaseList } = props;

	if (!Array.isArray(diseaseList) || !diseaseList.length) return <div></div>;

	return (
		<div>
			{diseaseList.map((disease: any, index: number) => {
				if (!disease) return null;
				return (
					<Accordion className={classes.accordion}>
						<AccordionSummary
							key={`disease-${index + 1}`}
							expandIcon={<ExpandMoreIcon />}
							aria-controls='panel1a-content'
							id='panel1a-header'
						>
							<Typography className={classes.heading}>
								{index === 0 ? "You may have " : "You can read more about "}{" "}
								<b>{disease?.name}</b>
							</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Typography className={classes.summaryBox}>
								This disease may occur with these symptoms like{" "}
								{disease?.HPODisorderAssociation?.map(
									(hpoData: any) => hpoData.hpoTerm
								).join(", ")}
							</Typography>
						</AccordionDetails>
					</Accordion>
				);
			})}
		</div>
	);
};

export default DiseaseList;
