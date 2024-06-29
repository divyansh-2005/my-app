'use client';
import { PropsWithChildren, useEffect, useState } from "react";
import { TmaContext } from "./context";
import { User, retrieveLaunchParams, SDKProvider } from "@tma.js/sdk-react";

export function TmaProvider({ children }: PropsWithChildren<{}>) {
    const [telegramUser, setTelegramUser] = useState<User>({} as User);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);

    function fetchTelegramUser() {
        try {
            const launchParams = retrieveLaunchParams();
            const user = launchParams?.initData?.user;
            if (!user) {
                throw new Error("User not found");
            }
            setTelegramUser(user);
        } catch (err) {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(fetchTelegramUser, []);

    if (isLoading) {
        return <TheLoadingComponent />;
    }

    if (isError) {
        return <TheErrorComponent />;
    }

    return (
        <SDKProvider>
            <TmaContext.Provider value={{ user: telegramUser }}>
                {children}
            </TmaContext.Provider>
        </SDKProvider>
    );
}

// Loading Component
function TheLoadingComponent() {
    return <div>Loading...</div>;
}

// Error Component
function TheErrorComponent() {
    return <div>This app opens only in Telegram mini app</div>;
}