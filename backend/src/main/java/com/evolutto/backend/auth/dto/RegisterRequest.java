package com.evolutto.backend.auth.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import com.evolutto.backend.domain.user.UserRole;

public record RegisterRequest(
        @NotBlank(message = "Nome de usuário é obrigatório")
        @Size(min = 3, max = 50, message = "Nome de usuário deve ter entre 3 e 50 caracteres")
        String username,

        @NotBlank(message = "Senha é obrigatória")
        @Size(min = 3, message = "Senha deve ter pelo menos 3 caracteres")
        String password,

        @NotNull(message = "Tipo de perfil é obrigatório")
        UserRole role
) {}
