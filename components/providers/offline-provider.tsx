"use client"

import React, { useEffect, useState } from "react"
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister"
import { QueryClient } from "@tanstack/react-query"
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client"
import { del, get, set } from "idb-keyval"

// Validated Adapter for idb-keyval to work with TanStack Persister
const idbStorage = {
    getItem: async (key: string) => {
        const value = await get(key)
        return value ?? null
    },
    setItem: async (key: string, value: string) => {
        await set(key, value)
    },
    removeItem: async (key: string) => {
        await del(key)
    },
}

const asyncPersister = createAsyncStoragePersister({
    storage: idbStorage,
    key: "HIOP_OFFLINE_CACHE",
    throttleTime: 1000, // Save to IDB at most every 1 second
})

const createQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                gcTime: 1000 * 60 * 60 * 24 * 7, // 7 Days (Garbage Collection time)
                staleTime: 1000 * 60 * 5, // 5 minutes standard freshness
                retry: 3,
                networkMode: "offlineFirst", // CRITICAL for FieldLink
            },
            mutations: {
                networkMode: "offlineFirst",
            },
        },
    })

export function OfflineProvider({ children }: { children: React.ReactNode }) {
    // Ensure we run on client side only for IDB
    const [queryClient] = useState(() => createQueryClient())

    return (
        <PersistQueryClientProvider
            client={queryClient}
            persistOptions={{ persister: asyncPersister }}
        >
            {children}
        </PersistQueryClientProvider>
    )
}
