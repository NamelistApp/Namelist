package com.namelist.NamelistBE.service

import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.stereotype.Service

@Service
class NamelistUserDetailService(): UserDetailsService {
    override fun loadUserByUsername(username: String): UserDetails {
        return User(username, "1234", emptyList())
    }
}