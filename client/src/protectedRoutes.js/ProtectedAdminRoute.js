import React from 'react'
import { Navigate } from 'react-router-dom'

// Protected Admin Route
export default function ProtectedAdminRoute({ currentUser, children }) {
    if (!currentUser || !currentUser.admin) {
        return <Navigate />
    }
    return children
}