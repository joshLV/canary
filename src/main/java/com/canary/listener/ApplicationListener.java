package com.canary.listener;

import com.sunny.tool.LoggerTool;
import org.springframework.context.ApplicationEvent;
import org.springframework.context.event.ContextClosedEvent;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.ContextStartedEvent;
import org.springframework.context.event.ContextStoppedEvent;
import org.springframework.stereotype.Component;

/**
 * ApplicationListener
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-09-24
 */
@Component
public class ApplicationListener implements org.springframework.context.ApplicationListener<ApplicationEvent> {

    @Override
    public void onApplicationEvent(ApplicationEvent event) {
        if (event instanceof ContextStartedEvent) {
            if (((ContextStartedEvent) event).getApplicationContext().getParent() == null) {
                LoggerTool.info("root container start");
            } else {
                LoggerTool.info("web container start");
            }
        } else if (event instanceof ContextRefreshedEvent) {
            if (((ContextRefreshedEvent) event).getApplicationContext().getParent() == null) {
                LoggerTool.info("root container start complete");
            } else {
                LoggerTool.info("web container start complete");
            }
        } else if (event instanceof ContextStoppedEvent) {
            if (((ContextStoppedEvent) event).getApplicationContext().getParent() == null) {
                LoggerTool.info("root container pause");
            } else {
                LoggerTool.info("web container pause");
            }
        } else if (event instanceof ContextClosedEvent) {
            if (((ContextClosedEvent) event).getApplicationContext().getParent() == null) {
                LoggerTool.info("root container close");
            } else {
                LoggerTool.info("web container close");
            }
        }
    }

    public void onRootContainerStart(){

    }

    public void onRootContainerStop(ContextStoppedEvent event){

    }

    public void onWebContainerStart(){

    }

    public void onWebContainerStop(ContextStoppedEvent event){

    }

}
