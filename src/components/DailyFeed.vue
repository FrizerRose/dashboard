<template>
  <div class="card flex-fill w-100">
    <div class="card-header">
      <span class="badge bg-info float-end">Today</span>
      <h5 class="card-title mb-0">
        Daily feed
      </h5>
    </div>
    <div class="card-body">
      <div class="d-flex align-items-start">
        <img
          src="/appstack/img/avatars/avatar-5.jpg"
          width="36"
          height="36"
          class="rounded-circle me-2"
          alt="Ashley Briggs"
        >
        <div class="flex-grow-1">
          <small class="float-end">5m ago</small>
          <strong>Ashley Briggs</strong> started following <strong>Stacie Hall</strong><br>
          <small class="text-muted">Today 7:51 pm</small><br>
        </div>
      </div>

      <hr>
      <div class="d-flex align-items-start">
        <img
          src="/appstack/img/avatars/avatar.jpg"
          width="36"
          height="36"
          class="rounded-circle me-2"
          alt="Chris Wood"
        >
        <div class="flex-grow-1">
          <small class="float-end">30m ago</small>
          <strong>Chris Wood</strong> posted something on <strong>Stacie Hall</strong>'s timeline<br>
          <small class="text-muted">Today 7:21 pm</small>

          <div class="border text-sm text-muted p-2 mt-1">
            Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing...
          </div>
        </div>
      </div>

      <hr>
      <div class="d-flex align-items-start">
        <img
          src="/appstack/img/avatars/avatar-4.jpg"
          width="36"
          height="36"
          class="rounded-circle me-2"
          alt="Stacie Hall"
        >
        <div class="flex-grow-1">
          <small class="float-end">1h ago</small>
          <strong>Stacie Hall</strong> posted a new blog<br>

          <small class="text-muted">Today 6:35 pm</small>
        </div>
      </div>

      <hr>
      <div class="d-grid">
        <a
          href="#"
          class="btn btn-primary"
        >Load more</a>
      </div>
    </div>
  </div>
</template>
