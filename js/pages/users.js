const UsersPage = {
    render() {
        let html = `
            <div class="page-header flex-between flex-wrap gap-md mb-lg">
                <div>
                    <h1 class="page-title text-2xl text-bold">User Management</h1>
                    <p class="page-subtitle text-secondary">Manage administrators and access</p>
                </div>
                <button class="btn btn-primary" id="btn-add-user">
                    <i data-lucide="plus"></i> Add User
                </button>
            </div>
            
            <div class="page-content">
                <div class="card">
                    <div class="table-container">
                        <table class="data-table" id="users-table" style="width:100%; text-align:left;">
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Role</th>
                                    <th>Last Login</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div class="flex gap-sm" style="align-items:center;">
                                            <div style="width:32px;height:32px;border-radius:50%;background:#1D4ED8;color:white;display:flex;align-items:center;justify-content:center;font-weight:bold;">AU</div>
                                            <div>
                                                <div class="text-bold">Admin User</div>
                                                <div class="text-sm text-secondary">admin@labx.edu</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td><span class="badge badge-info">System Administrator</span></td>
                                    <td>Today 9:00 AM</td>
                                    <td><span class="badge badge-healthy">Active</span></td>
                                    <td>
                                        <button class="btn btn-icon btn-ghost btn-edit" title="Edit User"><i data-lucide="edit"></i></button>
                                        <button class="btn btn-icon btn-ghost btn-delete text-critical" title="Delete User"><i data-lucide="trash-2"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="flex gap-sm" style="align-items:center;">
                                            <div style="width:32px;height:32px;border-radius:50%;background:#F59E0B;color:white;display:flex;align-items:center;justify-content:center;font-weight:bold;">DS</div>
                                            <div>
                                                <div class="text-bold">Dr. Smith</div>
                                                <div class="text-sm text-secondary">smith@college.edu</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td><span class="badge badge-info">Lab Manager</span></td>
                                    <td>Yesterday 3:00 PM</td>
                                    <td><span class="badge badge-healthy">Active</span></td>
                                    <td>
                                        <button class="btn btn-icon btn-ghost btn-edit" title="Edit User"><i data-lucide="edit"></i></button>
                                        <button class="btn btn-icon btn-ghost btn-delete text-critical" title="Delete User"><i data-lucide="trash-2"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="flex gap-sm" style="align-items:center;">
                                            <div style="width:32px;height:32px;border-radius:50%;background:#10B981;color:white;display:flex;align-items:center;justify-content:center;font-weight:bold;">JD</div>
                                            <div>
                                                <div class="text-bold">John Doe</div>
                                                <div class="text-sm text-secondary">john@college.edu</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td><span class="badge badge-info">Lab Assistant</span></td>
                                    <td>Aug 3 2025 10:30 AM</td>
                                    <td><span class="badge badge-healthy">Active</span></td>
                                    <td>
                                        <button class="btn btn-icon btn-ghost btn-edit" title="Edit User"><i data-lucide="edit"></i></button>
                                        <button class="btn btn-icon btn-ghost btn-delete text-critical" title="Delete User"><i data-lucide="trash-2"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="flex gap-sm" style="align-items:center;">
                                            <div style="width:32px;height:32px;border-radius:50%;background:#1D4ED8;color:white;display:flex;align-items:center;justify-content:center;font-weight:bold;">JW</div>
                                            <div>
                                                <div class="text-bold">Jane Wilson</div>
                                                <div class="text-sm text-secondary">jane@college.edu</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td><span class="badge badge-info">Viewer</span></td>
                                    <td>Jul 30 2025</td>
                                    <td><span class="badge badge-healthy">Active</span></td>
                                    <td>
                                        <button class="btn btn-icon btn-ghost btn-edit" title="Edit User"><i data-lucide="edit"></i></button>
                                        <button class="btn btn-icon btn-ghost btn-delete text-critical" title="Delete User"><i data-lucide="trash-2"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <div id="user-modal" class="modal-overlay" style="display:none; position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,0.5); z-index:100; align-items:center; justify-content:center;">
                <div class="modal card" style="width: 420px; max-width: 90vw;">
                    <div class="modal-header flex-between mb-md">
                        <h3 class="text-lg text-bold" id="modal-title">Add User</h3>
                        <button class="btn btn-icon btn-ghost btn-close-modal"><i data-lucide="x"></i></button>
                    </div>
                    <div class="modal-body mb-md">
                        <div class="form-group mb-md">
                            <label class="form-label">Full Name</label>
                            <input type="text" class="form-input" id="user-name" placeholder="John Doe">
                        </div>
                        <div class="form-group mb-md">
                            <label class="form-label">Email Address</label>
                            <input type="email" class="form-input" id="user-email" placeholder="john@example.com">
                        </div>
                        <div class="form-group mb-md">
                            <label class="form-label">User Role</label>
                            <select class="form-select" id="user-role">
                                <option>System Administrator</option>
                                <option>Lab Manager</option>
                                <option>Lab Assistant</option>
                                <option selected>Viewer</option>
                            </select>
                        </div>
                        <div class="form-group mb-md">
                            <label class="form-label">Password</label>
                            <input type="password" class="form-input" placeholder="••••••••">
                        </div>
                    </div>
                    <div class="modal-footer flex gap-sm" style="justify-content:flex-end;">
                        <button class="btn btn-secondary btn-close-modal">Cancel</button>
                        <button class="btn btn-primary" id="btn-save-user">Save User</button>
                    </div>
                </div>
            </div>
        `;
        return html;
    },

    init() {
        const modal = document.getElementById('user-modal');
        const modalTitle = document.getElementById('modal-title');
        const userName = document.getElementById('user-name');
        const userEmail = document.getElementById('user-email');
        const userRole = document.getElementById('user-role');
        const tbody = document.querySelector('#users-table tbody');
        let editingRow = null;
        
        const openModal = (title = 'Add User', name = '', email = '', role = 'Viewer', row = null) => {
            editingRow = row;
            modalTitle.textContent = title;
            userName.value = name;
            userEmail.value = email;
            userRole.value = role;
            modal.style.display = 'flex';
        };

        const closeModal = () => {
            modal.style.display = 'none';
        };

        document.getElementById('btn-add-user')?.addEventListener('click', () => openModal('Add New User'));
        
        document.querySelectorAll('.btn-close-modal').forEach(btn => {
            btn.addEventListener('click', closeModal);
        });

        const bindRowEvents = (tr) => {
            tr.querySelector('.btn-edit')?.addEventListener('click', () => {
                const name = tr.querySelector('.text-bold').textContent;
                const email = tr.querySelector('.text-secondary').textContent;
                const role = tr.querySelector('td:nth-child(2) span').textContent;
                openModal('Edit User', name, email, role, tr);
            });

            tr.querySelector('.btn-delete')?.addEventListener('click', () => {
                tr.remove();
                if (App.showToast) App.showToast('User removed successfully', 'success');
            });
        };

        document.querySelectorAll('#users-table tbody tr').forEach(tr => bindRowEvents(tr));

        document.getElementById('btn-save-user')?.addEventListener('click', () => {
            const name = userName.value.trim() || 'New User';
            const email = userEmail.value.trim() || 'user@labx.edu';
            const role = userRole.value;
            const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

            if (editingRow) {
                editingRow.querySelector('.text-bold').textContent = name;
                editingRow.querySelector('.text-secondary').textContent = email;
                editingRow.querySelector('td:nth-child(2)').innerHTML = `<span class="badge badge-info">${role}</span>`;
                if (App.showToast) App.showToast(`Updated user ${name}`, 'success');
            } else {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>
                        <div class="flex gap-sm" style="align-items:center;">
                            <div style="width:32px;height:32px;border-radius:50%;background:#2563EB;color:white;display:flex;align-items:center;justify-content:center;font-weight:bold;">${initials}</div>
                            <div>
                                <div class="text-bold">${name}</div>
                                <div class="text-sm text-secondary">${email}</div>
                            </div>
                        </div>
                    </td>
                    <td><span class="badge badge-info">${role}</span></td>
                    <td>Just now</td>
                    <td><span class="badge badge-healthy">Active</span></td>
                    <td>
                        <button class="btn btn-icon btn-ghost btn-edit" title="Edit User"><i data-lucide="edit"></i></button>
                        <button class="btn btn-icon btn-ghost btn-delete text-critical" title="Delete User"><i data-lucide="trash-2"></i></button>
                    </td>
                `;
                tbody.appendChild(tr);
                bindRowEvents(tr);
                if (App.showToast) App.showToast(`Added user ${name}`, 'success');
            }

            closeModal();
            if (window.lucide) window.lucide.createIcons();
        });

        if (window.lucide) window.lucide.createIcons();
    },

    destroy() {}
};
