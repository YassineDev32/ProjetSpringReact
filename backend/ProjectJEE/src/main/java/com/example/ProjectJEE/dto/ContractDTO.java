package com.example.ProjectJEE.dto;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class ContractDTO {

    private Long id;
    private Date creationDate;
    private String terms;
    private Long invoiceId;
}
