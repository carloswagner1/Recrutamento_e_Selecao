package com.g5tech.api.config;

import org.jasypt.util.text.StrongTextEncryptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeansConfig {

    @Bean
    public StrongTextEncryptor getStrongTextEncryptor () {
        StrongTextEncryptor textEncryptor = new StrongTextEncryptor();
        textEncryptor.setPassword("123456");

        return textEncryptor;
    }

}
