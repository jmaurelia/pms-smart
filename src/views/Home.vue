<template>
  <div class="page-wrapper">
    <!-- header -->
    <div class="page-header page-header-home">
      <b-link class="header-action"><b-icon icon="list" /></b-link>
      <div class="page-header-section">
        <h2 class="header-title mb-0">Hola, Juan</h2>
        <p class="text-secondary mb-0">Investigador</p>
      </div>
    </div>

    <!-- content -->
    <div class="page-content">
      <!-- header -->
      <div class="pms-title-category mb-4">
        <h5 class="title mb-0">Bioforest</h5>
        <p class="text-secondary mb-0">Numero Salas</p>
      </div>

      <!-- items -->
      <ul class="list-unstyled">
        <li class="mb-2">
          <b-card border-variant="light" class="pms-item-list">
            <div class="d-flex align-items-center pms-item">
              <b-avatar icon="house" size="41px" rounded />
              <h6 class="name ml-3 mr-auto mb-0">Name</h6>
              <b-icon icon="arrow-right-short" />
            </div>
          </b-card>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { database } from "@/firebase";
export default {
  
};
</script>