package com.cpsc304.sprintplanner.services.impl;

import com.cpsc304.sprintplanner.exceptions.OrganizationServiceException;
import com.cpsc304.sprintplanner.persistence.entities.Organization;
import com.cpsc304.sprintplanner.persistence.repositories.OrganizationRepository;
import com.cpsc304.sprintplanner.services.OrganizationService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@AllArgsConstructor
public class OrganizationServiceImp implements OrganizationService {
    OrganizationRepository organizationRepository;

    @Override
    public Organization getOrganizationByName(String name) throws OrganizationServiceException {
        try {
            return organizationRepository.findOrganizationByName(name);
        } catch (Exception e) {
            throw new OrganizationServiceException(e.getMessage(), e);
        }
    }

    @Override
    public List<Organization> getAllOrganizations() throws OrganizationServiceException {
        try {
            return organizationRepository.findAllOrganizations();
        } catch (Exception e) {
            throw new OrganizationServiceException(e.getMessage(), e);
        }
    }

    @Override
    public void saveOrganization(Organization organization) throws OrganizationServiceException {
        try {
            organizationRepository.save(organization);
        } catch (Exception e) {
            throw new OrganizationServiceException(e.getMessage(), e);
        }
    }
}
