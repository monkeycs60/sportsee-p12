import {
	getDataUser,
	getDataUserActivity,
	getDataUserAverageSession,
	getDataUserPerformance,
	getDataUserScore,
} from '../services/apiService';
import {
	USER_MAIN_DATA,
	USER_ACTIVITY,
	USER_AVERAGE_SESSIONS,
	USER_PERFORMANCE,
} from '../data/data';

const userID = 12;

export const fetchAPI = async () => {
	const [
		dataFromBack,
		dataFromBackScore,
		dataFromBackActivity,
		dataFromBackAverageSession,
		dataFromBackPerformance,
	] = await Promise.all([
		getDataUser(userID),
		getDataUserScore(userID),
		getDataUserActivity(userID),
		getDataUserAverageSession(userID),
		getDataUserPerformance(userID),
	]);

	return {
		dataFromBack,
		dataFromBackScore,
		dataFromBackActivity,
		dataFromBackAverageSession,
		dataFromBackPerformance,
	};
};

export const fetchMock = () => {
	return {
		dataFromBack: USER_MAIN_DATA,
		dataFromBackScore: USER_MAIN_DATA,
		dataFromBackActivity: USER_ACTIVITY,
		dataFromBackAverageSession: USER_AVERAGE_SESSIONS,
		dataFromBackPerformance: USER_PERFORMANCE,
	};
};
