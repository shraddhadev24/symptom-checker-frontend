import { useState } from "react";
import SymptomSelector from "../components/SymptomSelector";
import Header from "../components/Header";
import DiseaseList from "../components/DiseaseList";
import { makeStyles } from "@material-ui/core/styles";

import { diagnos } from "../service/service";

const styles = {
	diseaseContainer: {
		margin: "15px",
	},
};

const useStyles = makeStyles(styles);

const Dashboard = () => {
	const classes = useStyles();

	const [diseaseList, setDiseaseList] = useState<any>([]);

	const searchDisease = async (symptoms: string[]) => {
		const res: any = await diagnos(symptoms);

		if (Array.isArray(res.data) && res.data.length) {
			setDiseaseList(res.data);
		}
	};

	const clearDiseaseList = () => {
		if (diseaseList?.length) {
			setDiseaseList([]);
		}
	};

	return (
		<div>
			<Header />
			<SymptomSelector
				onSearchDisease={searchDisease}
				clearDiseaseList={clearDiseaseList}
			/>
			<div className={classes.diseaseContainer}>
				<DiseaseList diseaseList={diseaseList} />
			</div>
		</div>
	);
};

export default Dashboard;
