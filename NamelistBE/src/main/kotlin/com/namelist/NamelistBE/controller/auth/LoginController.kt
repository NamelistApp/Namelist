package com.namelist.NamelistBE.controller.auth

import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.AuthenticationException
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController 
@RequestMapping("/login")
class LoginController(private val authenticationManager: AuthenticationManager) {
    @PostMapping
    fun login(@RequestBody loginRequest: LoginRequest): String {
        try {
            val authentication = authenticationManager.authenticate(
                UsernamePasswordAuthenticationToken(loginRequest.emailAddress, loginRequest.password)
            )
            return "login successsful ${authentication.name}"
        } catch (ex: AuthenticationException) {
            throw RuntimeException("Invalid email or password")
        }
    }
}

data class LoginRequest(val emailAddress: String, val password: String)