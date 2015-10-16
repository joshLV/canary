package com.canary.annotation;

import java.lang.annotation.*;

/**
 * Role
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-07-24
 */
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
public @interface Role {

    String[] role() default {};

}
