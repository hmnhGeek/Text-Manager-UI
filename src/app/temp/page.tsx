"use client";

import { useAppSelector } from "@/redux/store";

const TempPage: React.FC = () => {
    const username = useAppSelector(state => state.authReducer.value.username);
    return <>Username = {username}</>
}

export default TempPage;